import { IDestinatario, IOrigen, IRoute } from "../interfaces";
import { createRandomId } from "../services/shared/Utils";
import { EstadoRegistro } from "../supports/app.constant";


export class Route implements IRoute{
    id?: string;
    origen: IOrigen;
    destino: IDestinatario;
    precio: number;
    fecha_crea: string;
    fecha_modifica?: string;
    estado: number;
    constructor(origen: IOrigen, destino: IDestinatario, precio: number) {
        this.id = createRandomId();
        this.origen = origen;
        this.destino = destino;
        this.precio = precio;
        this.estado = EstadoRegistro.ACTIVO;
        this.fecha_crea = new Date().toLocaleString('sv-SE', {timeZone: 'America/Lima' });
    }
}