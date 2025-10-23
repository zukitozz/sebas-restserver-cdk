
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";
import { ApproveGuiaRequest } from "../../dto";

export async function updateBilling(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const bill = parseJSON(event.body) as unknown as ApproveGuiaRequest;
    await updatePrecio(bill, ddbClient);
    await Promise.all(bill.transaccion.map(async (transaccion) => {
        await updateState(transaccion, ddbClient);
    }));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Billing updated successfully'
        })  
    };
}

async function updatePrecio(payload: ApproveGuiaRequest, ddbClient: DynamoDBClient): Promise<void>{  
    const { id } = payload;
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Key: {
            id: id
        },
        UpdateExpression: 'SET detalle[0].igv = :igv, detalle[0].igv_unitario = :igv_unitario, detalle[0].precio = :precio, detalle[0].precio_unitario = :precio_unitario, detalle[0].valor = :valor, detalle[0].valor_unitario = :valor_unitario, pago_efectivo = :pago_efectivo, pago_tarjeta = :pago_tarjeta, pago_yape = :pago_yape, total_gravadas = :total_gravadas, total_igv = :total_igv, total_venta = :total_venta',
        ExpressionAttributeValues: {
            ':igv': payload.igv.toString(),
            ':igv_unitario': payload.igv_unitario.toString(),
            ':precio': payload.precio.toString(),
            ':precio_unitario': payload.precio_unitario.toString(),
            ':valor': payload.valor.toString(),
            ':valor_unitario': payload.valor_unitario.toString(),
            ':pago_efectivo': payload.pago_efectivo.toString(),
            ':pago_tarjeta': payload.pago_tarjeta.toString(),
            ':pago_yape': payload.pago_yape.toString(),
            ':total_gravadas': payload.total_gravadas.toString(),
            ':total_igv': payload.total_igv.toString(),
            ':total_venta': payload.total_venta.toString()
        },
        ConditionExpression: 'attribute_exists(id)',
        ReturnValues: 'ALL_NEW',
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;
    console.log("Updated bill: ", result);
}

async function updateState(transaccion: string, ddbClient: DynamoDBClient): Promise<void>{
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Key: {
            id: transaccion
        },
        UpdateExpression: 'SET etapa = :etapa',
        ExpressionAttributeValues: {
            ':etapa': 'DISPATCH',
        },
        ConditionExpression: 'attribute_exists(transaccion)',
        ReturnValues: 'ALL_NEW',
    }
    console.log("updateState params: ", params);
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'update', params) as UpdateCommandOutput;
    console.log("updateState bill: ", result); 
}