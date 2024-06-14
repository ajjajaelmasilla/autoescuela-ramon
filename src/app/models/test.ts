import { Pregunta } from "./pregunta";

export interface Test {
  id: number;
  titulo: string;
  preguntas: Pregunta[];
  dificultad: number;
}
