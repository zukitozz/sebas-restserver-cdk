import { IDestinatario, IOrigen } from ".";


export interface IRoute{
    id?: string;
    origen: IOrigen;
    destino: IDestinatario;
    precio: number;
    fecha_crea: string;
    fecha_modifica?: string;
    estado: number;
}