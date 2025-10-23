import axios from 'axios';
import { posApi } from '../api';
import { TipoComprobante } from "./app.constant";
import { IBilling, ICarrier, ICarrierItem, IItem } from '../interfaces';

export interface PropsMiFact {
    hasErrorMiFact: boolean; 
    messageMiFact: string; 
    bodyRequest: any; 
    response: any
}
export interface PropsConsultaRucMiFact {
    hasErrorMiFact: boolean;
    messageMiFact: string;
    razon_social: string | null;
    direccion: string | null;
}
export const createOrderApiMiFact = async(comprobante: any): Promise<PropsMiFact> => {
    console.log(`createOrderApiMiFact Enviando comprobante: ${process.env.EMISOR_RUC}-${comprobante.numeracion}`);
    switch (comprobante.tipo_comprobante) {
        case TipoComprobante.Factura:
        case TipoComprobante.Boleta:
        case TipoComprobante.NotaCredito:
            return createBilling(comprobante as IBilling);
        case TipoComprobante.GuiaTransportista:
            return createGuia(comprobante as ICarrier);         
        case TipoComprobante.GuiaRemitente:
            return createGuiaRemitente(comprobante as ICarrier);                  
        default:
            return {
                hasErrorMiFact: true,
                messageMiFact: 'Tipo de comprobante no soportado',
                bodyRequest: null,
                response: null
            }
    }
}
export const createBilling = async(comprobante : IBilling): Promise<PropsMiFact> => {
    try {
        const { receptor, detalle } = comprobante;
        let splitedAfectado = [];
        if (comprobante.numeracion_documento_afectado !== undefined) {
            splitedAfectado =  comprobante.numeracion_documento_afectado.split("-");
        }

        var arr_items: any = [] 

        detalle.forEach((item:IItem) => {
            arr_items.push(
                {
                    "COD_ITEM": item.codigo,
                    "COD_UNID_ITEM": item.medida?item.medida:"GLL",
                    "CANT_UNID_ITEM": item.cantidad,
                    "VAL_UNIT_ITEM": item.valor_unitario,
                    "PRC_VTA_UNIT_ITEM": item.precio_unitario,
                    "VAL_VTA_ITEM": item.valor,
                    "MNT_BRUTO": item.valor,
                    "MNT_PV_ITEM": item.precio_unitario,
                    "COD_TIP_PRC_VTA": "01",
                    "COD_TIP_AFECT_IGV_ITEM":"10",
                    "COD_TRIB_IGV_ITEM": "1000",
                    "POR_IGV_ITEM": "18",
                    "MNT_IGV_ITEM": item.igv,
                    "TXT_DESC_ITEM": item.descripcion,
                    "DET_VAL_ADIC01": "",
                    "DET_VAL_ADIC02": "",
                    "DET_VAL_ADIC03": "",
                    "DET_VAL_ADIC04": ""                
                }
            )
        });

        const body = {
            "TOKEN":"gN8zNRBV+/FVxTLwdaZx0w==", // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            "COD_TIP_NIF_EMIS": "6",
            "NUM_NIF_EMIS": process.env.EMISOR_RUC,//20100100100            
            // "TOKEN":"tOcEEdPoW/SnZ0lYcWH/eA==", // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            // "COD_TIP_NIF_EMIS": "6",
            // "NUM_NIF_EMIS": "20609785269",
            "NOM_RZN_SOC_EMIS": process.env.EMISOR_RS,
            "NOM_COMER_EMIS": process.env.EMISOR_COMERCIAL,
            "COD_UBI_EMIS": process.env.EMISOR_UBIGEO,
            "TXT_DMCL_FISC_EMIS": process.env.EMISOR_DIR,
            "COD_TIP_NIF_RECP": receptor.tipo_documento,
            "NUM_NIF_RECP": receptor.numero_documento,
            "NOM_RZN_SOC_RECP": receptor.razon_social,
            "TXT_DMCL_FISC_RECEP": receptor.direccion,
            "FEC_EMIS": comprobante.fecha_emision,
            "FEC_VENCIMIENTO": comprobante.fecha_emision,
            "COD_TIP_CPE": comprobante.tipo_comprobante,
            "NUM_SERIE_CPE": comprobante.serie,
            "NUM_CORRE_CPE": comprobante.correlativo,
            "COD_MND": "PEN",
            "MailEnvio": receptor.correo,
            "COD_PRCD_CARGA": "001",
            "MNT_TOT_GRAVADO": comprobante.total_gravadas, 
            "MNT_TOT_TRIB_IGV": comprobante.total_igv, 
            "MNT_TOT": comprobante.total_venta, 
            "COD_PTO_VENTA": "jmifact",
            "ENVIAR_A_SUNAT": "false",
            "RETORNA_XML_ENVIO": "false",
            "RETORNA_XML_CDR": "false",
            "RETORNA_PDF": "false",
            "COD_FORM_IMPR":"001",
            "TXT_VERS_UBL":"2.1",
            "TXT_VERS_ESTRUCT_UBL":"2.0",
            "COD_ANEXO_EMIS":"0000",
            "COD_TIP_OPE_SUNAT": "0101",
            "COD_TIP_NC": (comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?"01":"",
            "TXT_DESC_MTVO": (comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?"anulacion de comprobante":"",
            "items": arr_items,
            "docs_referenciado": [
                {
                      "COD_TIP_DOC_REF": (comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?comprobante.tipo_documento_afectado:"",
                      "NUM_SERIE_CPE_REF": (comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?splitedAfectado[0]:"",
                      "NUM_CORRE_CPE_REF":(comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?splitedAfectado[1]:"",
                      "FEC_DOC_REF":(comprobante.tipo_comprobante == TipoComprobante.NotaCredito)?comprobante.fecha_documento_afectado:"",
                }
          ]
        }
        const response = await posApi.post(`${process.env.MIFACT_API}`, body);
        const bodyRequest = JSON.stringify(body);
        if(response.data){
            return {
                hasErrorMiFact: false,
                messageMiFact: 'Comprobante registrado correctamente ',
                bodyRequest,
                response: response.data
            }
        }else{
            return {
                hasErrorMiFact: false,
                messageMiFact: response.data.errors || 'Comprobante con error ',
                bodyRequest,
                response
            }
        }

    } catch (error: any) {
        console.error("createOrderApiMiFact error: ", error);
        if ( axios.isAxiosError(error) ) {
            return {
                hasErrorMiFact: true,
                messageMiFact: "createOrderApiMiFact: " + error.response?.data.message,
                bodyRequest: error,
                response: null
            }
        }
        return {
            hasErrorMiFact: true,
            messageMiFact : 'Error no controlado, hable con el administrador ' + error,
            bodyRequest: error,
            response: null
        }        
    }  
}
export const createGuia = async(comprobante: ICarrier): Promise<PropsMiFact> => {
    try {
        const { remitente, destinatario, conductor, vehiculo, detalle } = comprobante;
        var arr_items: any = [] 
        let iter:number = 0;
        detalle.forEach((item:ICarrierItem) => {
            iter++;
            arr_items.push(
                {
                    "NUM_LINEA": item.numero,
                    "COD_ITEM": item.codigo,
                    "COD_UND_MEDIDA_ITEM": item.medida,
                    "DESC_ITEM": item.descripcion,
                    "CANT_ITEM": item.cantidad,
                    "PESO_ITEM": item.peso,
                    "COD_PRODUCTO_SUNAT": "",
                    "INDICADOR_BIEN_NORMALIZADO_ITEM": item.normalizado,
                    "COD_PARTIDA_ARANCELARIA": item.codigo_partida            
                }
            )
        });

        const body = {
            "TOKEN":"gN8zNRBV+/FVxTLwdaZx0w==", // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            "RETORNA_XML_ENVIO": "false",
            "RETORNA_XML_CDR": "false",
            "RETORNA_PDF": "true", 
            "OBSERVACIONES": "ninguna",           
            "COD_TIP_NIF_EMIS": "6",
            "NUM_NIF_EMIS": process.env.EMISOR_RUC,//20100100100            
            // "TOKEN":"tOcEEdPoW/SnZ0lYcWH/eA==", // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            // "COD_TIP_NIF_EMIS": "6",
            // "NUM_NIF_EMIS": "20609785269",
            "NOM_COMER_EMIS": process.env.EMISOR_COMERCIAL,
            "TXT_DMCL_FISC_EMIS": process.env.EMISOR_DIR,
            "NOM_RZN_SOC_EMIS": process.env.EMISOR_RS,
            "COD_UBI_EMIS": process.env.EMISOR_UBIGEO,
            "COD_TIP_GUR": comprobante.tipo_comprobante,
            "NUM_SERIE_GUR": comprobante.serie,
            "ENVIAR_A_SUNAT": "true",
            "NUM_CORRE_GUR": comprobante.correlativo,
            "FEC_EMIS_GUR": comprobante.fecha_emision,
            "FEC_TRASLADO": comprobante.fecha_traslado,
            "COD_TIP_NIF_REMIT": remitente.tipo_documento,
            "NOM_RZN_SOC_REMITENTE": remitente.razon_social,
            "NUM_NIF_REMITENTE": remitente.numero_documento,
            "COD_TIP_NIF_DEST": destinatario.tipo_documento,
            "NOM_RZN_SOC_DEST": destinatario.razon_social,            
            "NUM_NIF_DEST": destinatario.numero_documento,
            "DIR_LLEGADA": comprobante.llegada_direccion,
            "UBI_LLEGADA": comprobante.llegada_ubigeo,
            "IND_TRANSBORDO": false,
            "PESO_BRUTO": comprobante.peso_bruto,
            "UND_MEDIDA": "KGM",
            "NUM_NIF_CONDUCT": conductor.numero_documento,
            "COD_TIP_NIF_CONDUCT": conductor.tipo_documento,
            "NOM_RZN_SOC_CONDUCT": conductor.nombres,
            "NRO_LICENCIA_CONDUCT": conductor.licencia,
            "PLACA": vehiculo.placa,
            "CONSTANCIA_VEHICULAR_TUC": vehiculo.tuc,
            "DIR_PARTIDA": comprobante.partida_direccion,
            "UBI_PARTIDA": comprobante.partida_ubigeo,
            "TXT_VERS_UBL":"2.1",
            "TXT_VERS_ESTRUCT_UBL":"2.0",
            "COD_PRCD_CARGA":"001",
            "NRO_REGISTRO_MTC": conductor.nro_registro_mtc,
            "items": arr_items
        }
        const response = await posApi.post(`${process.env.MIFACT_API_GUIA}`, body);
        const bodyRequest = JSON.stringify(body);
        if(response.data){
            return {
                hasErrorMiFact: false,
                messageMiFact: 'Comprobante registrado correctamente ',
                bodyRequest,
                response: response.data
            }
        }else{
            return {
                hasErrorMiFact: false,
                messageMiFact: response.data.errors || 'Comprobante con error ',
                bodyRequest,
                response
            }
        }
    } catch (error: any) {
        console.error("createGuiaApiMifact error: ", error);
        if ( axios.isAxiosError(error) ) {
            return {
                hasErrorMiFact: true,
                messageMiFact: "createGuiaApiMifact: " + error.response?.data.message,
                bodyRequest: error,
                response: null
            }
        }
        return {
            hasErrorMiFact: true,
            messageMiFact : 'Error no controlado, hable con el administrador ' + error,
            bodyRequest: error,
            response: null
        }        
    }
}
export const createGuiaRemitente = async(comprobante: ICarrier): Promise<PropsMiFact> => {
    try {
        const { remitente, destinatario, conductor, vehiculo, detalle } = comprobante;
        var arr_items: any = [] 
        let iter:number = 0;
        detalle.forEach((item:ICarrierItem) => {
            iter++;
            arr_items.push(
                {
                    "NUM_LINEA": item.numero,
                    "COD_ITEM": item.codigo,
                    "DESC_ITEM": item.descripcion,
                    "CANT_ITEM": item.cantidad,
                    "PESO_ITEM": item.peso,
                    "COD_UND_MEDIDA_ITEM": item.medida,
                    "COD_PRODUCTO_SUNAT": "",
                    "INDICADOR_BIEN_NORMALIZADO_ITEM": item.normalizado,
                    "COD_PARTIDA_ARANCELARIA": item.codigo_partida            
                }
            )
        });

        const body = {
            "TOKEN": remitente.token_mifact, // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            "RETORNA_XML_ENVIO": false,
            "RETORNA_XML_CDR": false,
            "RETORNA_PDF": true, 
            "OBSERVACIONES": "ninguna",           
            "COD_TIP_NIF_EMIS": "6",
            "NUM_NIF_EMIS": remitente.numero_documento,//20100100100            
            // "TOKEN":"tOcEEdPoW/SnZ0lYcWH/eA==", // token del emisor, este token gN8zNRBV+/FVxTLwdaZx0w== es de pruebas
            // "COD_TIP_NIF_EMIS": "6",
            // "NUM_NIF_EMIS": "20609785269",
            "NOM_COMER_EMIS": remitente.nombre_comercial,
            "TXT_DMCL_FISC_EMIS": remitente.direccion,
            "NOM_RZN_SOC_EMIS": remitente.razon_social,
            "COD_UBI_EMIS": remitente.ubigeo,
            "COD_TIP_GUR": comprobante.tipo_comprobante,
            "NUM_SERIE_GUR": comprobante.serie,
            "ENVIAR_A_SUNAT": true,
            "NUM_CORRE_GUR": comprobante.correlativo,
            "FEC_EMIS_GUR": comprobante.fecha_emision,
            "COD_TIP_NIF_DEST": destinatario.tipo_documento,
            "NUM_NIF_DEST": destinatario.numero_documento,
            "DIR_LLEGADA": comprobante.llegada_direccion,
            "UBI_LLEGADA": comprobante.llegada_ubigeo,
            "NOM_RZN_SOC_DEST": destinatario.razon_social,     
            "MOT_TRASLADO":"01",
            "IND_TRANSBORDO": false,
            "PESO_BRUTO": comprobante.peso_bruto,//datos del transporte
            "UND_MEDIDA": "KGM",
            "MOD_TRASLADO":"02",
            "FEC_TRASLADO": comprobante.fecha_traslado,//datos necesario
            "NUM_NIF_CONDUCT": conductor.numero_documento,
            "COD_TIP_NIF_CONDUCT": conductor.tipo_documento,
            "NOM_RZN_SOC_CONDUCT": conductor.nombres,
            "NRO_LICENCIA_CONDUCT": conductor.licencia,
            "PLACA": vehiculo.placa,
            "DIR_PARTIDA": comprobante.partida_direccion,
            "UBI_PARTIDA": comprobante.partida_ubigeo,
            "TXT_CORREO_ENVIO": "soporte@mifact.net",//llenar este campo
            "INDICADOR_M1_L":"0",
            "TXT_VERS_UBL":"2.1",
            "TXT_VERS_ESTRUCT_UBL":"2.0",
            "COD_PRCD_CARGA":"001",
            "NRO_REGISTRO_MTC": conductor.nro_registro_mtc,
            "items": arr_items
        }
        const response = await posApi.post(`${process.env.MIFACT_API_GUIA}`, body);
        const bodyRequest = JSON.stringify(body);
        if(response.data){
            return {
                hasErrorMiFact: false,
                messageMiFact: 'Comprobante registrado correctamente ',
                bodyRequest,
                response: response.data
            }
        }else{
            return {
                hasErrorMiFact: false,
                messageMiFact: response.data.errors || 'Comprobante con error ',
                bodyRequest,
                response
            }
        }
    } catch (error: any) {
        console.error("createGuiaApiMifact error: ", error);
        if ( axios.isAxiosError(error) ) {
            return {
                hasErrorMiFact: true,
                messageMiFact: "createGuiaApiMifact: " + error.response?.data.message,
                bodyRequest: error,
                response: null
            }
        }
        return {
            hasErrorMiFact: true,
            messageMiFact : 'Error no controlado, hable con el administrador ' + error,
            bodyRequest: error,
            response: null
        }        
    }
}