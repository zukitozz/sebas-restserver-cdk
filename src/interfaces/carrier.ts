import { IConductor } from "./conductor";
import { IDestinatario } from "./destinatario";
import { IEmisor } from "./emisor";
import { ICarrierItem } from "./item";
import { IRemitente } from "./remitente";
import { IVehiculo } from "./vehiculo";

export interface ICarrier {
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
}