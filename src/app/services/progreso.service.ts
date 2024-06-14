import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private progresos: { [key: number]: { currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string } } } = {};

  constructor() {
    this.cargarProgresos();
  }

  guardarProgreso(testId: number, currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string }): void {
    this.progresos[testId] = { currentPreguntaIndex, respuestasSeleccionadas };
    localStorage.setItem('progresos', JSON.stringify(this.progresos));
  }

  cargarProgresos(): void {
    const savedProgresos = localStorage.getItem('progresos');
    if (savedProgresos) {
      this.progresos = JSON.parse(savedProgresos);
    }
  }

  limpiarProgreso(testId: number): void {
    delete this.progresos[testId];
    localStorage.setItem('progresos', JSON.stringify(this.progresos));
  }

  obtenerProgreso(testId: number): { currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string } } | undefined {
    return this.progresos[testId];
  }
}
