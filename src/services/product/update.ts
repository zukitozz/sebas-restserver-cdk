
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";
import { IProducto } from "../../interfaces";

export async function updateProduct(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const payload = parseJSON(event.body) as unknown as IProducto;
    const { id } = payload;
    const params = {
        TableName: process.env.TABLE_PRODUCT || '',
        Key: {
            id: id
        },
        UpdateExpression: 'SET igv = :igv, precio = :precio, valor = :valor, descripcion = :descripcion, codigo = :codigo, medida = :medida, date_modifica = :date_modifica, estado = :estado',
        ExpressionAttributeValues: {
            ':igv': payload.igv.toString(),
            ':precio': payload.precio.toString(),
            ':valor': payload.valor.toString(),
            ':descripcion': payload.descripcion.toString(),
            ':codigo': payload.codigo.toString(),
            ':medida': payload.medida.toString(),
            ':date_modifica': payload.date_modifica.toString(),
            ':estado': payload.estado.toString()
        },
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_NEW',
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;
    console.log("Updated product: ", result);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Product updated successfully'
        })
    };
}
