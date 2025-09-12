import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { saveSerie } from "./save";
import { getSeries } from "./get";
import { JsonError, MissingFieldException } from "../shared/Validators";

const ddbClient = new DynamoDBClient({});
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  let message: string = ''
  try {
    switch (event.httpMethod) {
      case 'GET':
        const getResponse = await getSeries(event, ddbClient);
        return getResponse;
      case 'POST':
        const postResponse = await saveSerie(event, ddbClient);
        return postResponse;
        default:
          break;
      case 'PUT':
        const putResponse = await saveSerie(event, ddbClient);
        return putResponse;      
    }
  } catch (error) {
    //console.error("Error: ", error);
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