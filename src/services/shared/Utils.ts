import { JsonError } from "./Validators";
import { v4 } from "uuid";  

export function createRandomId() {
   return v4();
}
export function parseJSON(arg: string){
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message);
    }
}