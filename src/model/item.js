"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Utils_1 = require("../services/shared/Utils");
var Item = /** @class */ (function () {
    function Item(idComprobante, cantidad, valor_unitario, precio_unitario, igv_unitario, valor, precio, igv, descripcion, codigo, placa, medida) {
        if (medida === void 0) { medida = 'NIU'; }
        this.id = (0, Utils_1.createRandomId)();
        this.idComprobante = idComprobante;
        this.cantidad = cantidad;
        this.valor_unitario = valor_unitario;
        this.precio_unitario = precio_unitario;
        this.igv_unitario = igv_unitario;
        this.valor = valor;
        this.precio = precio;
        this.igv = igv;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.placa = placa;
        this.medida = medida;
    }
    return Item;
}());
exports.Item = Item;
