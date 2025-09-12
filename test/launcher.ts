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
    url: '/SendInvoice',
    body: JSON.stringify({
        serie: 'F001',
        receptor: {
            tipo_documento: '6',
            numero_documento: '20100011884',
            razon_social: 'Empresa de Prueba S.A.C.',
            direccion: 'calle los girales',
            correo: 'jorge.castillo.pe@gmail.com'            
        },
        usuario: 'jcastillo',
        tipo_comprobante: '01',
        total_gravadas: 100,
        total_igv: 18,
        total_venta: 118,
        pago_yape: 0,
        pago_tarjeta: 0,
        pago_efectivo: 128.25,
        ruc: '20100011884',
        items: [
            { cantidad: 1, valor_unitario: 100, precio_unitario: 100, igv_unitario: 18, valor: 100, total: 100, precio: 100, igv: 18, descripcion: 'Item 1', medida: 'NIU', codigo: 'COD' },
        ],
        tipo_documento_afectado: '31',
        numeracion_documento_afectado: 'EG01-1',
        motivo_documento_afectado: 'GUIA DE REMISION TRANSPORTISTA'
    })
} as any, {} as any).then(result => {
    console.log("Result: ", result);
});

// handler({
//     httpMethod: 'GET'
// } as any, {} as any);

// handler({
//     httpMethod: 'GET',
//     queryStringParameters: {
//         id: '217c3937-05e8-47f3-b2ea-32a79440d08a'
//     }
// } as any, {} as any);


// handler({
//     httpMethod: 'POST',
//     url: '/SendInvoice',
// } as any, {} as any).then(result => {
//     console.log("Result: ", result);
// });

