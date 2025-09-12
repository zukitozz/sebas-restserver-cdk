import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { ISerie } from "../../interfaces";
import { Serie } from "../../model";

export async function getCorrelativo(ddbClient: DynamoDBClient, serie: string): Promise<ISerie> {

    const params = {
        TableName: process.env.TABLE_SERIE || '',
        Key: {
            serie
        },
        UpdateExpression: "ADD correlativo :correlativo",
        ExpressionAttributeValues: {
            ":correlativo": 1,
        },
        ConditionExpression: "attribute_exists(serie)",
        ReturnValues: "ALL_NEW",
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;

    if(!result.Attributes){
        throw new Error('Correlativo not found');
    }else{
        return  new Serie(serie, result.Attributes.correlativo);
    }
}