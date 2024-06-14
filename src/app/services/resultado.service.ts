import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private resultados: { [key: string]: { correctas: number; total: number; date: string; id: number }[] } = {};

  constructor() {
    this.cargarResultados();
  }

  registrarResultados(testId: number, correctas: number, total: number): void {
    const today = new Date().toISOString().split('T')[0];
    if (!this.resultados[today]) {
      this.resultados[today] = [];
    }
    this.resultados[today].push({ correctas, total, date: today, id: testId });
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }

  private cargarResultados(): void {
    const savedResultados = localStorage.getItem('resultados');
    if (savedResultados) {
      this.resultados = JSON.parse(savedResultados);
      for (const date in this.resultados) {
        if (!Array.isArray(this.resultados[date])) {
          this.resultados[date] = [];
        }
      }
    }
  }

  obtenerResultados(testId: number): { correctas: number; total: number; date: string; id: number }[] | undefined {
    const resultadosArray = Object.values(this.resultados).flat();
    return resultadosArray.filter(result => result.id === testId);
  }

  obtenerUltimoResultado(testId: number): { correctas: number; total: number; date: string; id: number } | undefined {
    const resultadosArray = Object.values(this.resultados).flat();
    return resultadosArray.filter(result => result.id === testId).pop();
  }

  obtenerResultadosAgrupadosPorDia(): { [key: string]: { id: number, correctas: number, total: number }[] } {
    const groupedResults: { [key: string]: { id: number, correctas: number, total: number }[] } = {};
    for (const date in this.resultados) {
      if (Array.isArray(this.resultados[date])) {
        groupedResults[date] = this.resultados[date].map(result => ({
          id: result.id,
          correctas: result.correctas,
          total: result.total
        }));
      }
    }
    return groupedResults;
  }

  obtenerTodosResultados(): { id: number, correctas: number, total: number }[] {
    const allResults: { id: number, correctas: number, total: number }[] = [];
    for (const date in this.resultados) {
      if (Array.isArray(this.resultados[date])) {
        allResults.push(...this.resultados[date]);
      }
    }
    return allResults;
  }
}
