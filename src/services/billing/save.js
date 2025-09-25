"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBilling = saveBilling;
var dynamo_support_1 = require("../../supports/dynamo.support");
var Validators_1 = require("../shared/Validators");
var Utils_1 = require("../shared/Utils");
var model_1 = require("../../model");
var correlativos_1 = require("../db/correlativos");
var carrier_1 = require("../../model/carrier");
var app_constant_1 = require("../../supports/app.constant");
function saveBilling(event, ddbClient) {
    return __awaiter(this, void 0, void 0, function () {
        var bill;
        return __generator(this, function (_a) {
            bill = (0, Utils_1.parseJSON)(event.body);
            switch (bill.tipo_comprobante) {
                case app_constant_1.TipoComprobante.Factura:
                    return [2 /*return*/, guardarComprobante(ddbClient, bill)];
                case app_constant_1.TipoComprobante.GuiaTransportista:
                    return [2 /*return*/, guardarGuiaTransportista(ddbClient, bill)];
                case app_constant_1.TipoComprobante.GuiaRemitente:
                    return [2 /*return*/, guardarGuiaRemitente(ddbClient, bill)];
                default:
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: JSON.stringify('Tipo de comprobante no soportado')
                        }];
            }
            return [2 /*return*/];
        });
    });
}
function guardarComprobante(ddbClient, bill) {
    return __awaiter(this, void 0, void 0, function () {
        var serie, comprobante, params, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, Validators_1.validateAsBillingEntry)(bill);
                    return [4 /*yield*/, (0, correlativos_1.getCorrelativo)(ddbClient, bill.serie)];
                case 1:
                    serie = _a.sent();
                    if (!serie) {
                        return [2 /*return*/, {
                                statusCode: 404,
                                body: JSON.stringify('Serie not found')
                            }];
                    }
                    comprobante = new model_1.Billing(serie.serie, serie.correlativo, serie.numeracion, bill.receptor, bill.usuario, bill.tipo_comprobante, bill.total_gravadas, bill.total_igv, bill.total_venta, bill.pago_yape, bill.pago_tarjeta, bill.pago_efectivo, bill.ruc, bill.items, bill.tipo_documento_afectado, bill.numeracion_documento_afectado, bill.motivo_documento_afectado);
                    params = {
                        TableName: process.env.TABLE_NAME || '',
                        Item: __assign({}, comprobante)
                    };
                    return [4 /*yield*/, dynamo_support_1.DynamoSupport.callSingleOperation(ddbClient, 'put', params)];
                case 2:
                    result = _a.sent();
                    console.log("Inserted bill: ", result);
                    return [2 /*return*/, {
                            statusCode: 201,
                            body: JSON.stringify({
                                message: 'Billing saved successfully',
                                comprobante: comprobante
                            })
                        }];
            }
        });
    });
}
function guardarGuiaTransportista(ddbClient, bill) {
    return __awaiter(this, void 0, void 0, function () {
        var serie, comprobante, params, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, correlativos_1.getCorrelativo)(ddbClient, bill.serie)];
                case 1:
                    serie = _a.sent();
                    if (!serie) {
                        return [2 /*return*/, {
                                statusCode: 404,
                                body: JSON.stringify('Serie not found')
                            }];
                    }
                    comprobante = new carrier_1.Carrier(serie.serie, serie.correlativo, bill.remitente, bill.destinatario, bill.conductor, bill.vehiculo, bill.usuario, bill.tipo_comprobante, serie.numeracion, bill.llegada_direccion, bill.llegada_ubigeo, bill.partida_direccion, bill.partida_ubigeo, bill.peso_bruto, bill.ruc, bill.items);
                    params = {
                        TableName: process.env.TABLE_NAME || '',
                        Item: __assign({}, comprobante)
                    };
                    return [4 /*yield*/, dynamo_support_1.DynamoSupport.callSingleOperation(ddbClient, 'put', params)];
                case 2:
                    result = _a.sent();
                    console.log("Inserted bill transportista: ", result);
                    return [2 /*return*/, {
                            statusCode: 201,
                            body: JSON.stringify({
                                message: 'Carrier saved successfully',
                                comprobante: comprobante
                            })
                        }];
            }
        });
    });
}
function guardarGuiaRemitente(ddbClient, bill) {
    return __awaiter(this, void 0, void 0, function () {
        var serie, comprobante, params, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, correlativos_1.getCorrelativo)(ddbClient, bill.serie)];
                case 1:
                    serie = _a.sent();
                    if (!serie) {
                        return [2 /*return*/, {
                                statusCode: 404,
                                body: JSON.stringify('Serie not found')
                            }];
                    }
                    comprobante = new carrier_1.Carrier(serie.serie, serie.correlativo, bill.remitente, bill.destinatario, bill.conductor, bill.vehiculo, bill.usuario, bill.tipo_comprobante, serie.numeracion, bill.llegada_direccion, bill.llegada_ubigeo, bill.partida_direccion, bill.partida_ubigeo, bill.peso_bruto, bill.ruc, bill.items);
                    params = {
                        TableName: process.env.TABLE_NAME || '',
                        Item: __assign({}, comprobante)
                    };
                    return [4 /*yield*/, dynamo_support_1.DynamoSupport.callSingleOperation(ddbClient, 'put', params)];
                case 2:
                    result = _a.sent();
                    console.log("Inserted bill remitente: ", result);
                    return [2 /*return*/, {
                            statusCode: 201,
                            body: JSON.stringify({
                                message: 'Carrier saved successfully',
                                comprobante: comprobante
                            })
                        }];
            }
        });
    });
}
