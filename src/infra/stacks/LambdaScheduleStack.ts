import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import { EventRule } from './EventRule';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';

interface LambdaStackProps extends StackProps {
    spacesTables: ITable;
    logRetention: number;
    apiMifact?: string;
    apiMifactGuia?: string;
    emisorRuc?: string;
    emisorRazonSocial?: string;
    emisorNombreComercial?: string;
    emisorUbigeo?: string;
    emisorDireccion?: string;
}
export class LambdaScheduleStack extends Stack {

    public readonly moduleLambdaIntegration: LambdaIntegration
    public readonly name: String

    constructor(scope: Construct, id: string, module: string, props: LambdaStackProps) {
        super(scope, id, props);
        
        const moduleLambda = new NodejsFunction(this, `${module}Lambda`, {
            runtime: Runtime.NODEJS_LATEST,
            handler: 'handler',
            entry: (join(__dirname, '../..', 'services', 'billing', 'process.ts')),
            environment: {
                TABLE_NAME: props.spacesTables.tableName,
                MIFACT_API: props.apiMifact || '',
                MIFACT_API_GUIA: props.apiMifactGuia || '',
                EMISOR_RUC: props.emisorRuc || '',
                EMISOR_RS: props.emisorRazonSocial || '',
                EMISOR_COMERCIAL: props.emisorNombreComercial || '',
                EMISOR_UBIGEO: props.emisorUbigeo || '',
                EMISOR_DIR: props.emisorDireccion || ''
            },            
            functionName: `${module}Lambda`,
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

        const eventRule = new EventRule(this, "EventConstruct");

        eventRule.rule.addTarget(
            new LambdaFunction(moduleLambda)            
        );

        this.moduleLambdaIntegration = new LambdaIntegration(moduleLambda)
        this.name = module;

    }
}
