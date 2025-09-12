import { IBilling } from "../../interfaces";

export class MissingFieldException extends Error {
  constructor(missingField: string) {
    super(`Missing field: ${missingField}`);
  }
}
export class JsonError extends Error {}
export function validateAsBillingEntry (arg: any){
    if((arg as IBilling).receptor === undefined){
        throw new MissingFieldException('idReceptor');
    }
    if((arg as IBilling).usuario === undefined){
        throw new MissingFieldException('idUsuario');
    }    
    if((arg as IBilling).tipo_comprobante === undefined){
        throw new MissingFieldException('tipo_comprobante');
    }
    if((arg as IBilling).items === undefined || (arg as IBilling).items.length === 0){
        throw new MissingFieldException('items');
    }        
}