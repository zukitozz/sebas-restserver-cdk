"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serie = void 0;
var app_constant_1 = require("../supports/app.constant");
var Serie = /** @class */ (function () {
    function Serie(serie, correlativo) {
        this.serie = serie;
        this.correlativo = correlativo;
        this.numeracion = serie + app_constant_1.GUION + correlativo.toString().padStart(6, '0');
    }
    return Serie;
}());
exports.Serie = Serie;
