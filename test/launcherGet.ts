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

// handler({
//     httpMethod: 'GET'
// } as any, {} as any);

handler({
    httpMethod: 'GET',
    queryStringParameters: {
        fecha_emision: '2025-09-25',
        limit: '2',
        //start: '{"id":"6b2f86aa-3b36-40f0-b890-d0bd333887f2", "fecha_emision":"2025-09-25", "fecha_actual":"2025-09-25 19:22:02"}',
    }
} as any, {} as any).then(result => {
    console.log("Result: ", result);
});


// handler({
//     httpMethod: 'POST',
//     url: '/SendInvoice',
// } as any, {} as any).then(result => {
//     console.log("Result: ", result);
// });

