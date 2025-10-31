import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { GetCommandOutput, ScanCommandOutput, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

export async function getRoutes(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if(event.queryStringParameters){
        if ('id' in event.queryStringParameters) {
            const id = event.queryStringParameters.id;
            const params = {
                TableName: process.env.TABLE_ROUTES || '',
                Key: { id }
            }
            const result = await DynamoSupport.callSingleOperation(ddbClient, 'get', params) as any;
            if(!result.Items && result.Items.length === 0){
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Route with id ${id} not found`)
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(result.Items)
            }
        } else {
            const exclusiveStartKey = event.queryStringParameters.start;
            const limit = event.queryStringParameters.limit;
            const params: QueryCommandInput = {
                TableName: process.env.TABLE_ROUTES || '',
                ScanIndexForward: true,
                Limit: limit ? parseInt(limit) : 10
            };
            if (exclusiveStartKey) {
                try {
                    params.ExclusiveStartKey = JSON.parse(exclusiveStartKey);
                } catch (e) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify('Invalid start key format')
                    };
                }
            };
            console.log("Request query: ", params);
            const result = await DynamoSupport.callSingleOperation(ddbClient, 'query', params) as any;
            console.log("Result query: ", result);
            if(!result.Items || result.Items.length === 0){
                return {
                    statusCode: 404,
                    body: JSON.stringify(`Route not found`)
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    items: result.Items,
                    ...(result.LastEvaluatedKey ? { lastEvaluatedKey: result.LastEvaluatedKey } : {})
                })
            };
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