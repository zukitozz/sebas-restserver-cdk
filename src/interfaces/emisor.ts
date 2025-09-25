export interface IEmisor{
    id?: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    nombre_comercial: string;
    ubigeo: string;
    direccion: string;
    token_mifact: string;
    correo?: string;
}