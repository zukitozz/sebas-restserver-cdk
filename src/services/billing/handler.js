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
exports.handler = handler;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var save_1 = require("./save");
var get_1 = require("./get");
var Validators_1 = require("../shared/Validators");
var update_1 = require("./update");
var ddbClient = new client_dynamodb_1.DynamoDBClient({});
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var message, responseApi, _a, error_1, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = '';
                    console.log("Event: ", event);
                    console.log("Context: ", context);
                    responseApi = {
                        statusCode: 0,
                        body: ""
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    _a = event.httpMethod;
                    switch (_a) {
                        case 'GET': return [3 /*break*/, 2];
                        case 'POST': return [3 /*break*/, 4];
                        case 'PUT': return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2: return [4 /*yield*/, (0, get_1.getBillings)(event, ddbClient)];
                case 3:
                    responseApi = _b.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, (0, save_1.saveBilling)(event, ddbClient)];
                case 5:
                    responseApi = _b.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (0, update_1.updateBilling)(event, ddbClient)];
                case 7:
                    responseApi = _b.sent();
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, __assign(__assign({}, responseApi), { headers: {
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        } })];
                case 9:
                    error_1 = _b.sent();
                    console.error("Error: ", error_1);
                    if (error_1 instanceof Validators_1.MissingFieldException) {
                        return [2 /*return*/, {
                                statusCode: 400,
                                body: JSON.stringify(error_1.message),
                            }];
                    }
                    if (error_1 instanceof Validators_1.JsonError) {
                        return [2 /*return*/, {
                                statusCode: 400,
                                body: JSON.stringify(error_1.message),
                            }];
                    }
                    return [2 /*return*/, {
                            statusCode: 500,
                            body: JSON.stringify(error_1.message),
                        }];
                case 10:
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(message),
                    };
                    return [2 /*return*/, response];
            }
        });
    });
}
