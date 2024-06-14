import { Component } from '@angular/core';
import { ResultadoService } from '../../services/resultado.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  historial: { date: string, tests: { id: number, correctas: number, total: number }[] }[] = [];

  constructor(private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.loadHistorial();
  }

  loadHistorial(): void {
    const resultados = this.resultadoService.obtenerResultadosAgrupadosPorDia();
    this.historial = Object.keys(resultados).map(date => {
      return {
        date: date,
        tests: resultados[date]
      };
    });
  }
}
