import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import { S3Client, ListBucketsCommand }  from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: 'us-east-1' });


async function handler(event: APIGatewayProxyEvent, context: Context) {

  const command = new ListBucketsCommand({});
  const listBucketsResult = (await s3Client.send(command)).Buckets;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!, here are your buckets:" + listBucketsResult
    }), 
  }
  return response;
}

export { handler };