import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { JsonError, MissingFieldException } from "../shared/Validators";
import { UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { IBilling } from "../../interfaces";
import { createOrderApiMiFact } from "../../supports/api.mifact";

const ddbClient = new DynamoDBClient({});
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  try {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        FilterExpression: 'etapa = :etapa',
        ExpressionAttributeValues: { 
            ':etapa': 'DISPATCH'
        }
    };
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'scan', params);

    if(result.length > 0){
      const comprobante = result[0] as IBilling;
      const { id } = comprobante;
      const { hasErrorMiFact, messageMiFact, bodyRequest, response } = await createOrderApiMiFact(comprobante);

      let updateExpresion = '';
      updateExpresion = "SET etapa = :etapa, body = :body, respuesta_mifact = :respuesta_mifact, intentos = intentos + :intentos";

      const params = {
          TableName: process.env.TABLE_NAME || '',
          Key: { id },
          UpdateExpression: updateExpresion,
          ExpressionAttributeValues: {":etapa": 'SENT', ":respuesta_mifact": response, ":body": bodyRequest, ":intentos": 1},
          ConditionExpression: "attribute_exists(id)",
          ReturnValues: "ALL_NEW",
      }
      await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;
      if(hasErrorMiFact){
          return {
              statusCode: 400, 
              body: JSON.stringify(messageMiFact)
          }
      }      
      return {
          statusCode: 201,
          body: JSON.stringify(result[0])  
      }  
    } else {
      return {
        statusCode: 500, 
        body: "No hay comprobantes pendientes de enviar.", 
      }       
    }
  }catch (error) {
    if(error instanceof MissingFieldException) {
      return {
        statusCode: 400, 
        body: JSON.stringify(error.message), 
      }
    }
    if(error instanceof JsonError) {
      return {
        statusCode: 400, 
        body: JSON.stringify(error.message), 
      }
    }    
    return {
      statusCode: 500, 
      body: JSON.stringify(error.message), 
    }    
  }
}

export { handler };