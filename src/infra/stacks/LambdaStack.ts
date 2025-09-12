import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    spacesTables: ITable;
    seriesTables: ITable;
    logRetention: number;
}
export class LambdaStack extends Stack {

    public readonly moduleLambdaIntegration: LambdaIntegration
    public readonly name: String

    constructor(scope: Construct, id: string, module: string, props: LambdaStackProps) {
        super(scope, id, props);
        
        const moduleLambda = new NodejsFunction(this, `${module}Lambda`, {
            runtime: Runtime.NODEJS_LATEST,
            handler: 'handler',
            entry: (join(__dirname, '../..', 'services', module, 'handler.ts')),
            environment: {
                TABLE_NAME: props.spacesTables.tableName,
                TABLE_SERIE: props.seriesTables.tableName
            },
            logRetention: props.logRetention
        });

        moduleLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.spacesTables.tableArn],
            actions: [
                'dynamodb:PutItem', 
                'dynamodb:GetItem', 
                'dynamodb:Scan',
                'dynamodb:UpdateItem'
            ]
        }));

        moduleLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.seriesTables.tableArn],
            actions: [
                'dynamodb:PutItem', 
                'dynamodb:GetItem', 
                'dynamodb:Scan',
                'dynamodb:UpdateItem'
            ]
        }));

        this.moduleLambdaIntegration = new LambdaIntegration(moduleLambda)
        this.name = module;

    }
}
