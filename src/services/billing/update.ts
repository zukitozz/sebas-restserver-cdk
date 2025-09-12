
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export async function updateBilling(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Billing saved successfully',
            comprobante: 'test'
        })  
    }
}