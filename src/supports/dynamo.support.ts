import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import CustomException from "./custom.exception";
import { DB_ERROR_MESSAGES } from "./error.constant";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, ScanCommandOutput, UpdateCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoSupport {
  static async callSingleOperation(ddbClient: DynamoDBClient, action: string, params: any): Promise<any> {
    const dynamoDb = DynamoDBDocumentClient.from(ddbClient);
    try {
      switch (action) {
        case 'scan':
          const response: ScanCommandOutput = await dynamoDb.send(new ScanCommand(params));
          return response?.Items? response.Items : [];
        case 'get':
          return await dynamoDb.send(new GetCommand(params));
        case 'put':
          return await dynamoDb.send(new PutCommand(params));    
        case 'update':
          return await dynamoDb.send(new UpdateCommand(params));
        case 'query':
          return await dynamoDb.send(new QueryCommand(params));                           
      }
    } catch (error: any) {
      console.error("Error DynamoSuport: ", error);
      throw new CustomException({
        code: DB_ERROR_MESSAGES.CODE,
        httpStatus: 200,
        message: error.name,
        details: error.message
      });
    }
  }
}
