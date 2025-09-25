import { handler } from "../src/services/billing/handler";
const numeral = "0282c0f789e9";

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = 'SpaceTable-' + numeral;
process.env.TABLE_SERIE = 'SeriesTable-' + numeral;
process.env.MIFACT_API = 'http://demo.mifact.net.pe/api/invoiceService.svc/SendInvoice';
process.env.MIFACT_API_GUIA = 'http://demo.mifact.net.pe/api/invoiceService.svc/SendInvoice';
process.env.EMISOR_RUC = '20100100100';
process.env.EMISOR_RS = 'Empresa de Prueba S.A.C.';
process.env.EMISOR_COMERCIAL = 'Empresa de Prueba S.A.C.';
process.env.EMISOR_UBIGEO = '150101';
process.env.EMISOR_DIR = 'calle los girales 123';

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
            serie: "T001",
            fecha_traslado: "2025-09-25 14:11:43",
            remitente: {
                tipo_documento: "6",
                numero_documento: "20612024821",
                razon_social: "GRUPO NONATO ANDAHUASI E.I.R.L.",
                ubigeo: "150101",
                direccion: "CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN",
                correo: "987654321",
                nombre_comercial: "GRUPO NONATO ANDAHUASI E.I.R.L.",
                token_mifact: ""
            },
            destinatario: {
                tipo_documento: "6",
                numero_documento: "20612024821",
                razon_social: "GRUPO NONATO ANDAHUASI E.I.R.L.",
                ubigeo: "140513",
                direccion: "CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN",
                correo: "987654321"
            },
            conductor: {
                usuario: "vquezada",
                tipo_documento: "1",
                numero_documento: "42629411",
                nombres: "Victor Jonathan Quezada Reyna",
                licencia: "Q42629411",
                nro_registro_mtc: "Q42629411"
            },
            vehiculo: {
                placa: "AJA914",
                tuc: "151716053236556"
            },
            usuario: "jcastillo",
            tipo_comprobante: "09",
            llegada_direccion: "CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN",
            llegada_ubigeo: "140513",
            partida_direccion: "AV. NESTOR GAMBETA NRO. 1265 Z.I. .- PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO",
            partida_ubigeo: "070101",
            peso_bruto: 351292.99999999994,
            ruc: "20612024821"
        })
} as any, {} as any).then(result => {
    console.log("Result: ", result);
});

