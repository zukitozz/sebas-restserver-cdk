import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";


export async function saveProduct(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const product = parseJSON(event.body);
    const params = {
        TableName: process.env.TABLE_PRODUCT || '',
        Item: { 
            ...product
        }
    }    
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    console.log("Inserted product: ", result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Product saved successfully',
            product
        })  
    }    

}
