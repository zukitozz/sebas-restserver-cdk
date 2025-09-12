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
        serie: 'EG01',
        remitente: {
            tipo_documento: '6',
            numero_documento: '20608699679',
            razon_social: 'Empresa de Prueba Remitente S.A.C.'          
        },
        destinatario: {
            tipo_documento: '6',
            numero_documento: '20100011884',
            razon_social: 'Empresa de Pruebaa destinatario S.A.C.'          
        },
        conductor: {
            usuario: 'jcastillo',
            tipo_documento: '1',
            numero_documento: '49838746',
            nombres: 'KARINA CHAVEZ'          
        },   
        vehiculo: {
            placa: 'ATY437',
            tuc: 'MTCVH00781'        
        },            
        usuario: 'jcastillo',
        tipo_comprobante: '31',
        llegada_direccion: 'calle los girales 123',
        llegada_ubigeo: '150101',
        partida_direccion: 'calle los girales 123',
        partida_ubigeo: '150101',
        peso_bruto: 100,
        ruc: '20100011884',
        items: [
            { numero: 1, codigo: 'COD1', descripcion: 'test', cantidad: 18, peso: 100, codigo_sunat: '', normalizado: 0, codigo_partida: ''},
        ]
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

