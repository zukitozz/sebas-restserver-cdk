
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";
import { IRoute } from "../../interfaces";

export async function updateRoute(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const payload = parseJSON(event.body) as unknown as IRoute;
    const { id } = payload;
    const params = {
        TableName: process.env.TABLE_ROUTES || '',
        Key: {
            id: id
        },
        UpdateExpression: 'SET precio = :precio',
        ExpressionAttributeValues: {
            ':precio': payload.precio.toString()
        },
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_NEW',
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;
    console.log("Updated route: ", result);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Route updated successfully'
        })
    };
}
