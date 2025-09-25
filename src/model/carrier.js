"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrier = void 0;
var Utils_1 = require("../services/shared/Utils");
var Carrier = /** @class */ (function () {
    function Carrier(serie, correlativo, remitente, destinatario, conductor, vehiculo, usuario, tipo_comprobante, numeracion, llegada_direccion, llegada_ubigeo, partida_direccion, partida_ubigeo, peso_bruto, ruc, items, fecha_emision, fecha_traslado) {
        if (fecha_emision === void 0) { fecha_emision = new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeZone: 'America/Lima' }); }
        if (fecha_traslado === void 0) { fecha_traslado = new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeZone: 'America/Lima' }); }
        this.id = (0, Utils_1.createRandomId)();
        this.remitente = remitente;
        this.destinatario = destinatario;
        this.conductor = conductor;
        this.vehiculo = vehiculo;
        this.usuario = usuario;
        this.tipo_comprobante = tipo_comprobante;
        this.serie = serie;
        this.correlativo = correlativo;
        this.numeracion = numeracion;
        this.fecha_emision = fecha_emision;
        this.fecha_traslado = fecha_traslado;
        this.fecha_actual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Lima' });
        this.llegada_direccion = llegada_direccion;
        this.llegada_ubigeo = llegada_ubigeo;
        this.partida_direccion = partida_direccion;
        this.partida_ubigeo = partida_ubigeo;
        this.peso_bruto = peso_bruto;
        this.ruc = ruc;
        this.enviado = false; // Default value
        this.intentos = 0; // Default value
        this.items = items || [];
    }
    return Carrier;
}());
exports.Carrier = Carrier;
