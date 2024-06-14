import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { Pregunta } from '../models/pregunta';
import { PreguntaService } from './pregunta.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests: Test[] = [];
  private temarioTests: { [key: string]: Test[] } = {};
  private seed: number = 67890;
  private dificultades: { [key: number]: number } = {};

  constructor(private preguntaService: PreguntaService) {
    this.crearTests();
    this.crearTemarioTests();
    this.cargarDificultades();
  }

  private crearTests(): void {
    const todasPreguntas = this.preguntaService.obtenerTodasPreguntas();
    for (let i = 1; i <= 120; i++) {
      const preguntas = this.seleccionarPreguntasAleatorias(todasPreguntas, 30, this.seed + i);
      const dificultad = this.calcularDificultad(i);
      this.tests.push({
        id: i,
        titulo: `Test ${i}`,
        preguntas: preguntas,
        dificultad: dificultad
      });
    }
  }

  private crearTemarioTests(): void {
    const temas = [
      'Tema 1', 'Tema 2', 'Tema 3', 'Tema 4', 'Tema 5',
      'Tema 6', 'Tema 7', 'Tema 8', 'Tema 9', 'Tema 10'
    ];
    const temarioPreguntas = this.preguntaService.obtenerTemarioPreguntas();
    temas.forEach((temario, index) => {
      this.temarioTests[temario] = [];
      for (let i = 1; i <= 10; i++) {
        const testId = (index + 1) * 100000 + i;
        const preguntas = this.seleccionarPreguntasAleatorias(temarioPreguntas, 30, this.seed + index * 10 + i);
        const dificultad = this.calcularDificultad(testId);
        this.temarioTests[temario].push({
          id: testId,
          titulo: `${temario} - Test ${i}`,
          preguntas: preguntas,
          dificultad: dificultad
        });
      }
    });
  }

  private seleccionarPreguntasAleatorias(preguntas: Pregunta[], num: number, seed: number): Pregunta[] {
    const shuffled = this.barajarArray([...preguntas], seed);
    return shuffled.slice(0, num);
  }

  private barajarArray(array: any[], seed: number): any[] {
    let m = array.length, t, i;

    while (m) {
      i = Math.floor(this.pseudoAleatorio(seed) * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;

      seed++;
    }

    return array;
  }

  private pseudoAleatorio(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  private obtenerDificultadAleatoria(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  private calcularDificultad(testId: number): number {
    if (!this.dificultades[testId]) {
      this.dificultades[testId] = this.obtenerDificultadAleatoria();
      this.persistirDificultades();
    }
    return this.dificultades[testId];
  }

  private persistirDificultades(): void {
    localStorage.setItem('dificultades', JSON.stringify(this.dificultades));
  }

  private cargarDificultades(): void {
    const savedDificultades = localStorage.getItem('dificultades');
    if (savedDificultades) {
      this.dificultades = JSON.parse(savedDificultades);
    }
  }

  obtenerTests(): Test[] {
    return this.tests;
  }

  obtenerTestDetalle(id: number): Test | undefined {
    return this.tests.find(test => test.id === id) || this.obtenerTemarioTestDetalle(id);
  }

  private obtenerTemarioTestDetalle(id: number): Test | undefined {
    for (const key in this.temarioTests) {
      const test = this.temarioTests[key].find(test => test.id === id);
      if (test) {
        return test;
      }
    }
    return undefined;
  }

  obtenerTemarioTests(): { [key: string]: Test[] } {
    return this.temarioTests;
  }
}
