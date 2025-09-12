import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";

export async function saveSerie(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const item = parseJSON(event.body);
    const params = {
        TableName: process.env.TABLE_SERIE || '',
        Item: { 
            ...item
        }
    }

    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Serie saved successfully',
            item: item
        })  
    }
}