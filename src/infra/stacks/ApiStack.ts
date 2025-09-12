import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
  lambdaIntegration?: LambdaIntegration;
  name: string;
  lambdaScheduleIntegration?: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: ApiStackProps[]) {
    super(scope, id);

    const api = new RestApi(this, 'BillingApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowHeaders: ["*"],
        allowMethods: ["*"],
      }
    })
    props.forEach(prop => {
      const moduleResource = api.root.addResource(prop.name)
      if(prop.lambdaScheduleIntegration) {
        moduleResource.addMethod('POST', prop.lambdaScheduleIntegration)
      }else{
        moduleResource.addMethod('GET', prop.lambdaIntegration)
        moduleResource.addMethod('POST', prop.lambdaIntegration)
        moduleResource.addMethod('PUT', prop.lambdaIntegration)  
      }
    });

  }
}
