import { ISerie } from "../interfaces";
import { createRandomId } from "../services/shared/Utils";
import { GUION } from "../supports/app.constant";

export class Serie implements ISerie{
    id?: string;
    serie: string;
    correlativo: number;
    numeracion?: string;
    constructor(serie: string, correlativo: number){
        this.serie = serie;
        this.correlativo = correlativo;
        this.numeracion = serie + GUION + correlativo.toString().padStart(6, '0');
    }
}