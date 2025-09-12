import { handler } from "../src/services/util/handler";

const numeral = "0282c0f789e9";
process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = 'SpaceTable-' + numeral;
process.env.TABLE_SERIE = 'SeriesTable-' + numeral;

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        serie: 'EG01',
        correlativo: 1,
        tipo_comprobante: '31'
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


