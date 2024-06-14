import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import * as testData from '../../assets/tests.json';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private todasPreguntas: Pregunta[] = [];
  private temarioPreguntas: Pregunta[] = [];

  constructor() {
    this.cargarPreguntas();
    this.cargarTemarioPreguntas();
  }

  private cargarPreguntas(): void {
    this.todasPreguntas = (testData as any).default.map((item: any, index: number) => ({
      id: index + 1,
      img: 'assets/' + item.img,
      pregunta: item.pregunta,
      opciones: [
        { letra: 'a', texto: item['a.'], esCorrecta: item.correcta.split(' ')[0] === '1' },
        { letra: 'b', texto: item['b.'], esCorrecta: item.correcta.split(' ')[1] === '1' },
        { letra: 'c', texto: item['c.'], esCorrecta: item.correcta.split(' ')[2] === '1' }
      ],
      explicacion: item.explicacion
    }));
  }

  private cargarTemarioPreguntas(): void {
    this.temarioPreguntas = (testData as any).default.slice(0, 400).map((item: any, index: number) => ({
      id: index + 1 + 1000,
      img: 'assets/' + item.img,
      pregunta: item.pregunta,
      opciones: [
        { letra: 'a', texto: item['a.'], esCorrecta: item.correcta.split(' ')[0] === '1' },
        { letra: 'b', texto: item['b.'], esCorrecta: item.correcta.split(' ')[1] === '1' },
        { letra: 'c', texto: item['c.'], esCorrecta: item.correcta.split(' ')[2] === '1' }
      ],
      explicacion: item.explicacion
    }));
  }

  obtenerTodasPreguntas(): Pregunta[] {
    return this.todasPreguntas;
  }

  obtenerTemarioPreguntas(): Pregunta[] {
    return this.temarioPreguntas;
  }
}
