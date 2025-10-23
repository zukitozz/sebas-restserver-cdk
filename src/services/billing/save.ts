import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoSupport } from "../../supports/dynamo.support";
import { PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { validateAsBillingEntry } from "../shared/Validators";
import { parseJSON } from "../shared/Utils";
import { Billing, Item } from "../../model";
import { IItem, ISerie } from "../../interfaces";
import { getCorrelativo } from "../db/correlativos";
import { Carrier } from "../../model/carrier";
import { TipoComprobante } from "../../supports/app.constant";

export async function saveBilling(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const bill = parseJSON(event.body);
    switch (bill.tipo_comprobante) {
        case TipoComprobante.Factura:
            return guardarComprobante(ddbClient, bill)
        case TipoComprobante.GuiaTransportista:
            return guardarGuiaTransportista(ddbClient, bill)
        case TipoComprobante.GuiaRemitente:
            return guardarGuiaRemitente(ddbClient, bill)
        default:
            return {
                statusCode: 400,
                body: JSON.stringify('Tipo de comprobante no soportado')
            }     
    }
}

async function guardarComprobante(ddbClient: DynamoDBClient, bill: any): Promise<APIGatewayProxyResult>{
    console.log("guardarComprobante bill");
    validateAsBillingEntry(bill);
    const serie: ISerie = await getCorrelativo(ddbClient, bill.serie);
    if(!serie){
        return {
            statusCode: 404,
            body: JSON.stringify('Serie not found')
        }
    }
    const comprobante = new Billing(
        serie.serie,
        serie.correlativo,
        serie.numeracion,
        bill.receptor, 
        bill.usuario, 
        bill.tipo_comprobante, 
        bill.total_gravadas, 
        bill.total_igv, 
        bill.total_venta, 
        bill.pago_yape, 
        bill.pago_tarjeta, 
        bill.pago_efectivo, 
        bill.ruc,
        bill.etapa,
        bill.transaccion,
        bill.detalle,
        bill.tipo_documento_afectado,
        bill.numeracion_documento_afectado,
        bill.motivo_documento_afectado
    );
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: { 
            ...comprobante
        }
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    console.log("Inserted bill: ", result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Billing saved successfully',
            comprobante
        })  
    }
}
async function guardarGuiaTransportista(ddbClient: DynamoDBClient, bill: any): Promise<APIGatewayProxyResult>{
    const serie: ISerie = await getCorrelativo(ddbClient, bill.serie);
    if(!serie){
        return {
            statusCode: 404,
            body: JSON.stringify('Serie not found')
        }
    }
    const comprobante = new Carrier(
        serie.serie,
        serie.correlativo,
        bill.remitente,
        bill.destinatario,
        bill.conductor,
        bill.vehiculo,
        bill.usuario,
        bill.tipo_comprobante,
        serie.numeracion,
        bill.llegada_direccion,
        bill.llegada_ubigeo,
        bill.partida_direccion,
        bill.partida_ubigeo,
        bill.peso_bruto,
        bill.ruc,
        bill.etapa,
        bill.transaccion,
        bill.detalle
    );
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: { 
            ...comprobante
        }
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    console.log("Inserted bill transportista: ", result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Carrier saved successfully',
            comprobante
        })  
    } 
}
async function guardarGuiaRemitente(ddbClient: DynamoDBClient, bill: any): Promise<APIGatewayProxyResult>{
    const serie: ISerie = await getCorrelativo(ddbClient, bill.serie);
    if(!serie){
        return {
            statusCode: 404,
            body: JSON.stringify('Serie not found')
        }
    }
    const comprobante = new Carrier(
        serie.serie,
        serie.correlativo,
        bill.remitente,
        bill.destinatario,
        bill.conductor,
        bill.vehiculo,
        bill.usuario,
        bill.tipo_comprobante,
        serie.numeracion,
        bill.llegada_direccion,
        bill.llegada_ubigeo,
        bill.partida_direccion,
        bill.partida_ubigeo,
        bill.peso_bruto,
        bill.ruc,
        bill.etapa,
        bill.transaccion,
        bill.detalle
    );
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: { 
            ...comprobante
        }
    }
    const result = await DynamoSupport.callSingleOperation(ddbClient, 'put', params) as PutCommandOutput;
    console.log("Inserted bill remitente: ", result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Carrier saved successfully',
            comprobante
        })  
    } 
}