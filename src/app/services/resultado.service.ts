import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private resultados: { [userId: number]: { [key: string]: { correctas: number; total: number; date: string; id: number }[] } } = {};

  constructor(private usuarioService: UsuarioService) {
    this.cargarResultados();
  }

  registrarResultados(testId: number, correctas: number, total: number): void {
    const userId = this.usuarioService.getCurrentUser().id;
    const today = new Date().toISOString().split('T')[0];
    if (!this.resultados[userId]) {
      this.resultados[userId] = {};
    }
    if (!this.resultados[userId][today]) {
      this.resultados[userId][today] = [];
    }
    this.resultados[userId][today].push({ correctas, total, date: today, id: testId });
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }

  private cargarResultados(): void {
    const savedResultados = localStorage.getItem('resultados');
    if (savedResultados) {
      this.resultados = JSON.parse(savedResultados);
      for (const userId in this.resultados) {
        for (const date in this.resultados[userId]) {
          if (!Array.isArray(this.resultados[userId][date])) {
            this.resultados[userId][date] = [];
          }
        }
      }
    }
  }

  obtenerResultados(testId: number): { correctas: number; total: number; date: string; id: number }[] | undefined {
    const userId = this.usuarioService.getCurrentUser().id;
    const resultadosArray = Object.values(this.resultados[userId] || {}).flat();
    return resultadosArray.filter(result => result.id === testId);
  }

  obtenerUltimoResultado(testId: number): { correctas: number; total: number; date: string; id: number } | undefined {
    const userId = this.usuarioService.getCurrentUser().id;
    const resultadosArray = Object.values(this.resultados[userId] || {}).flat();
    return resultadosArray.filter(result => result.id === testId).pop();
  }

  obtenerResultadosAgrupadosPorDia(): { [key: string]: { id: number, correctas: number, total: number }[] } {
    const userId = this.usuarioService.getCurrentUser().id;
    const groupedResults: { [key: string]: { id: number, correctas: number, total: number }[] } = {};
    if (this.resultados[userId]) {
      for (const date in this.resultados[userId]) {
        if (Array.isArray(this.resultados[userId][date])) {
          groupedResults[date] = this.resultados[userId][date].map(result => ({
            id: result.id,
            correctas: result.correctas,
            total: result.total
          }));
        }
      }
    }
    return groupedResults;
  }

  obtenerTodosResultados(): { id: number, correctas: number, total: number }[] {
    const userId = this.usuarioService.getCurrentUser().id;
    const allResults: { id: number, correctas: number, total: number }[] = [];
    if (this.resultados[userId]) {
      for (const date in this.resultados[userId]) {
        if (Array.isArray(this.resultados[userId][date])) {
          allResults.push(...this.resultados[userId][date]);
        }
      }
    }
    return allResults;
  }
}
