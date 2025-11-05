import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";
import { Route } from "../../model/route";


export async function saveRoute(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const route = parseJSON(event.body);
    const saveRoute = new Route(route.origen, route.destino, route.precio_galon);
    const params = {
        TableName: process.env.TABLE_ROUTES || '',
        Item: { 
            ...saveRoute
        }
    }    
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    console.log("Inserted route: ", result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Route saved successfully',
            route
        })  
    }    

}
