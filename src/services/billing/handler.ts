import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { saveBilling } from "./save";
import { getBillings } from "./get";
import { JsonError, MissingFieldException } from "../shared/Validators";
import { updateBilling } from "./update";

const ddbClient = new DynamoDBClient({});
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let message: string = ''
  console.log("Event: ", event);
  console.log("Context: ", context);
  let responseApi: APIGatewayProxyResult = {
    statusCode: 0,
    body: ""
  };
  try {
    switch (event.httpMethod) {
      case 'GET':
        responseApi = await getBillings(event, ddbClient);
        break;
      case 'POST':
        responseApi = await saveBilling(event, ddbClient);
        break;
      case 'PUT':
        responseApi = await updateBilling(event, ddbClient);
        break;
    }
    return {
      ...responseApi,
      headers: {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
      }
    }
  } catch (error) {
    console.error("Error: ", error);
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

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message), 
  }
  return response;
}

export { handler };