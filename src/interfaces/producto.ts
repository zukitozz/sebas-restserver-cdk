export interface IProducto {
    id?:            string;
    valor:          number;
    precio:         number;
    igv:            number;
    descripcion:    string;
    codigo:         string;
    medida:         string;
    date_crea:      string;
    date_modifica?: string;
    estado:         boolean;
}