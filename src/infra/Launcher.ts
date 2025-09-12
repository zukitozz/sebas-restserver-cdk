import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { LambdaScheduleStack } from "./stacks/LambdaScheduleStack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdas = []
const lambdaStackBilling = new LambdaStack(app, "LambdaBillingStack", 'billing', {
    spacesTables: dataStack.spacesTable,
    seriesTables: dataStack.seriesTable,
    logRetention: 7
});
const lambdaStackUtil = new LambdaStack(app, "LambdaUtilStack", 'util', {
    spacesTables: dataStack.spacesTable,
    seriesTables: dataStack.seriesTable,
    logRetention: 7
});
const lambdaScheduleStack = new LambdaScheduleStack(app, "LambdaScheduleStack", 'schedule', {
    spacesTables: dataStack.spacesTable,
    apiMifact: 'https://demo.mifact.net.pe/api/invoiceService.svc/SendInvoice',
    apiMifactGuia: 'https://demo.mifact.net.pe/api/invoiceService.svc/SendInvoice',
    emisorRuc: '20100100100',
    emisorRazonSocial: 'Mi Empresa S.A.C.',
    emisorNombreComercial: 'Mi Empresa',
    emisorUbigeo: '150101',
    emisorDireccion: 'Av. Ejemplo 123',
    logRetention: 7
});
lambdas.push({ name: lambdaStackBilling.name, lambdaIntegration: lambdaStackBilling.moduleLambdaIntegration });
lambdas.push({ name: lambdaStackUtil.name, lambdaIntegration: lambdaStackUtil.moduleLambdaIntegration });
lambdas.push({ name: lambdaScheduleStack.name, lambdaScheduleIntegration: lambdaScheduleStack.moduleLambdaIntegration });
new ApiStack(app, "ApiStack", lambdas)