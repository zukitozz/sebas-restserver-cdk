import { ICarrier, ICarrierItem, IConductor, IDestinatario, IRemitente, IVehiculo } from "../interfaces";
import { createRandomId } from "../services/shared/Utils";

export class Carrier implements ICarrier{
    id?: string;
    remitente: IRemitente;
    destinatario: IDestinatario;
    conductor: IConductor;
    vehiculo: IVehiculo;
    usuario: string;
    tipo_comprobante: string;
    serie?: string;
    correlativo?: number;
    numeracion?: string;
    fecha_emision?: string;
    fecha_traslado?: string;
    fecha_actual?: string;
    llegada_direccion: string;
    llegada_ubigeo: string;
    partida_direccion: string;
    partida_ubigeo: string;
    peso_bruto: number;
    ruc: string;
    enviado?: boolean;
    intentos: number;
    etapa: string;
    transaccion: string;
    detalle?: ICarrierItem[];
    constructor(serie: string, correlativo: number, remitente: IRemitente, destinatario: IDestinatario, conductor: IConductor, vehiculo: IVehiculo, usuario: string, tipo_comprobante: string, numeracion: string, llegada_direccion: string, llegada_ubigeo: string, partida_direccion: string, partida_ubigeo: string, peso_bruto: number, ruc: string, etapa: string, transaccion: string, detalle: ICarrierItem[], fecha_emision: string = new Date().toLocaleString('sv-SE', {dateStyle: 'short', timeZone: 'America/Lima' }), fecha_traslado: string = new Date().toLocaleString('sv-SE', {dateStyle: 'short', timeZone: 'America/Lima' })) {
        this.id = createRandomId();
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
        this.fecha_actual = new Date().toLocaleString('sv-SE', {timeZone: 'America/Lima' });
        this.llegada_direccion = llegada_direccion;
        this.llegada_ubigeo = llegada_ubigeo;
        this.partida_direccion = partida_direccion;
        this.partida_ubigeo = partida_ubigeo;
        this.peso_bruto = peso_bruto;
        this.ruc = ruc;
        this.etapa = etapa;
        this.transaccion = transaccion;
        this.enviado = false; // Default value
        this.intentos = 0; // Default value
        this.detalle = detalle || [];
    }
}