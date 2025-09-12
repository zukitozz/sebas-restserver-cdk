import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { GetCommandOutput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";

export async function getBillings(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters){
        if ('id' in event.queryStringParameters) {
            const id = event.queryStringParameters.id;
            const params = {
                TableName: process.env.TABLE_NAME || '',
                Key: { id }
            }
            const result = await DynamoSupport.callSingleOperation(ddbClient, 'get', params) as GetCommandOutput;
            if(!result.Item){
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Billing with id ${id} not found`)
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(result.Item)
            }
        }else{
            return {
                statusCode: 400,
                body: JSON.stringify('ID not found')
            }
        }
    }else{
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Limit: 10
        };
        const result = await DynamoSupport.callSingleOperation(ddbClient, 'scan', params) as ScanCommandOutput;
        return {
            statusCode: 201,
            body: JSON.stringify(result)
        }
    }
}