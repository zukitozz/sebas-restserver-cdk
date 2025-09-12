export interface IItem {
    id?: string;
    idComprobante?: string;
    idAbastecimiento?: string;
    cantidad: number;
    valor_unitario: number;
    precio_unitario: number;
    igv_unitario: number;
    valor: number;
    precio: number;
    igv: number;
    descripcion?: string;
    codigo?: string;
    placa?: string;
    medida?: string;
}

export interface ICarrierItem {
    numero: number;
    codigo?: string;
    descripcion?: string;
    cantidad: number;
    peso: number;
    codigo_sunat: string;
    normalizado: number;
    codigo_partida: string;
    medida?: string;
}