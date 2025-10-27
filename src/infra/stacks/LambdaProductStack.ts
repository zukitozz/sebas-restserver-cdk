import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    productsTables: ITable;
    logRetention: number;
}

export class LambdaProductStack extends Stack {
    public readonly moduleLambdaIntegration: LambdaIntegration
    public readonly name: String

    constructor(scope: Construct, id: string, module: string, props: LambdaStackProps) {
        super(scope, id, {
            env:{
                account: 'AKIA5YEXBITPJFQYPONY',
                region: 'us-east-2',
            },
            ...props
        });

        const moduleLambda = new NodejsFunction(this, `${module}Lambda`, {
            runtime: Runtime.NODEJS_LATEST,
            handler: 'handler',
            entry: (join(__dirname, '../..', 'services', module, 'handler.ts')),
            environment: {
                TABLE_PRODUCT: props.productsTables.tableName
            },
            functionName: `${module}Lambda`,
            logRetention: props.logRetention
        });

        moduleLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.productsTables.tableArn],
            actions: [
                'dynamodb:PutItem', 
                'dynamodb:GetItem', 
                'dynamodb:Scan',
                'dynamodb:UpdateItem',
                'dynamodb:Query'
            ]
        }));

        this.moduleLambdaIntegration = new LambdaIntegration(moduleLambda)
        this.name = module;        
    }
}