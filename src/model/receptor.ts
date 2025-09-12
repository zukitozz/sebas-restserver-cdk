import { IReceptor } from "../interfaces";

export class Receptor implements IReceptor{
    id?: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    direccion: string;
    correo?: string;
    constructor(tipo_documento: string, numero_documento: string, razon_social: string, direccion: string) {
        this.tipo_documento = tipo_documento;
        this.numero_documento = numero_documento;
        this.razon_social = razon_social;
        this.direccion = direccion;
    }
}