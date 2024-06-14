import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private progresos: { [userId: number]: { [testId: number]: { currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string } } } } = {};

  constructor(private usuarioService: UsuarioService) {
    this.cargarProgresos();
  }

  guardarProgreso(testId: number, currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string }): void {
    if (currentPreguntaIndex > 29) return;
    if (!this.progresos[this.usuarioService.getCurrentUser().id]) {
      this.progresos[this.usuarioService.getCurrentUser().id] = {};
    }
    this.progresos[this.usuarioService.getCurrentUser().id][testId] = { currentPreguntaIndex, respuestasSeleccionadas };
    localStorage.setItem('progresos', JSON.stringify(this.progresos));
  }

  cargarProgresos(): void {
    const savedProgresos = localStorage.getItem('progresos');
    if (savedProgresos) {
      this.progresos = JSON.parse(savedProgresos);
    }
  }

  limpiarProgreso(testId: number): void {
    if (this.progresos[this.usuarioService.getCurrentUser().id]) {
      delete this.progresos[this.usuarioService.getCurrentUser().id][testId];
      if (Object.keys(this.progresos[this.usuarioService.getCurrentUser().id]).length === 0) {
        delete this.progresos[this.usuarioService.getCurrentUser().id];
      }
      localStorage.setItem('progresos', JSON.stringify(this.progresos));
    }
  }

  obtenerProgreso(testId: number): { currentPreguntaIndex: number, respuestasSeleccionadas: { [key: number]: string } } | undefined {
    return this.progresos[this.usuarioService.getCurrentUser().id]?.[testId];
  }
}
