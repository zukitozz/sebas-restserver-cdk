import { IItem } from "../interfaces";
import { createRandomId } from "../services/shared/Utils";

export class Item implements IItem{
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
    constructor(idComprobante: string, cantidad: number, valor_unitario: number, precio_unitario: number, igv_unitario: number, valor: number, precio: number, igv: number, descripcion?: string, codigo?: string, placa?: string, medida: string = 'NIU'){
        this.id = createRandomId();
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
}