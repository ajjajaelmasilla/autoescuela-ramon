import { Opcion } from "./opcion";

export interface Pregunta {
    id: number;
    img: string;
    pregunta: string;
    opciones: Opcion[];
    explicacion: string;
}