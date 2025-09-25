"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billing = void 0;
var Utils_1 = require("../services/shared/Utils");
var Billing = /** @class */ (function () {
    function Billing(serie, correlativo, numeracion, receptor, usuario, tipo_comprobante, total_gravadas, total_igv, total_venta, pago_yape, pago_tarjeta, pago_efectivo, ruc, items, tipo_documento_afectado, numeracion_documento_afectado, motivo_documento_afectado, fecha_emision) {
        if (tipo_documento_afectado === void 0) { tipo_documento_afectado = ''; }
        if (numeracion_documento_afectado === void 0) { numeracion_documento_afectado = ''; }
        if (motivo_documento_afectado === void 0) { motivo_documento_afectado = ''; }
        if (fecha_emision === void 0) { fecha_emision = new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeZone: 'America/Lima' }); }
        this.id = (0, Utils_1.createRandomId)();
        this.serie = serie;
        this.correlativo = correlativo;
        this.numeracion = numeracion;
        this.fecha_emision = fecha_emision;
        this.fecha_actual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Lima' });
        this.receptor = receptor;
        this.usuario = usuario;
        this.tipo_comprobante = tipo_comprobante;
        this.total_gravadas = total_gravadas;
        this.total_igv = total_igv;
        this.total_venta = total_venta;
        this.pago_yape = pago_yape;
        this.pago_tarjeta = pago_tarjeta;
        this.pago_efectivo = pago_efectivo;
        this.ruc = ruc;
        this.items = items;
        this.tipo_documento_afectado = tipo_documento_afectado;
        this.numeracion_documento_afectado = numeracion_documento_afectado;
        this.motivo_documento_afectado = motivo_documento_afectado;
        this.enviado = false;
        this.intentos = 0;
    }
    return Billing;
}());
exports.Billing = Billing;
