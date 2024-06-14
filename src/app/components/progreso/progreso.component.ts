import { Component, OnInit } from '@angular/core';
import { ResultadoService } from '../../services/resultado.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit {
  dailyResults: any[] = [];
  totalResults: any[] = [];
  aciertosUltimosDiezDias: number = 0;
  erroresUltimosDiezDias: number = 0;
  mensajeProgreso: string = '';

  view: [number, number] = [700, 400];

  showLegend: boolean = false;
  showLabels: boolean = false;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  arcWidth: number = 0.5;

  colorScheme = {
    domain: ['#66BB6A', '#EF5350', '#FFA726', '#42A5F5'] 
  };

  constructor(private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.loadDailyChartData();
    this.loadTotalChartData();
    this.calcularPorcentajeUltimosDiezDias();
    window.onresize = () => {
      this.view = [window.innerWidth * 0.45, 400];
    };
  }

  sinEstadisiticasDiarias(): boolean {
    return this.dailyResults[0].value === 0 && this.dailyResults[1].value === 0;
  }

  sinEstadisiticasTotales(): boolean {
    return this.totalResults[0].value === 0 && this.totalResults[1].value === 0;
  }

  loadDailyChartData(): void {
    const resultados = this.resultadoService.obtenerResultadosAgrupadosPorDia();
    const today = new Date().toISOString().split('T')[0];
    const todayResults = resultados[today] || [];
    
    const totalAciertos = todayResults.reduce((acc, val) => acc + val.correctas, 0);
    const totalErrores = todayResults.reduce((acc, val) => acc + (val.total - val.correctas), 0);

    this.dailyResults = [
      { name: 'Aciertos', value: totalAciertos },
      { name: 'Errores', value: totalErrores }
    ];

    console.log(this.dailyResults)
  }

  loadTotalChartData(): void {
    const resultados = this.resultadoService.obtenerTodosResultados();
    let totalAciertos = 0;
    let totalErrores = 0;

    resultados.forEach(test => {
      totalAciertos += test.correctas;
      totalErrores += (test.total - test.correctas);
    });

    this.totalResults = [
      { name: 'Aciertos', value: totalAciertos },
      { name: 'Errores', value: totalErrores }
    ];
  }

  calcularPorcentajeUltimosDiezDias(): void {
    const resultados = this.resultadoService.obtenerResultadosAgrupadosPorDia();
    const fechas = Object.keys(resultados).sort().reverse().slice(0, 10);

    this.aciertosUltimosDiezDias = 0;
    this.erroresUltimosDiezDias = 0;

    fechas.forEach(fecha => {
      resultados[fecha].forEach(result => {
        this.aciertosUltimosDiezDias += result.correctas;
        this.erroresUltimosDiezDias += (result.total - result.correctas);
      });
    });

    const totalPreguntas = this.aciertosUltimosDiezDias + this.erroresUltimosDiezDias;
    const porcentajeAciertos = totalPreguntas > 0 ? (this.aciertosUltimosDiezDias / totalPreguntas) * 100 : 0;

    if (porcentajeAciertos >= 90) {
      this.mensajeProgreso = "va muy bien, ya se puede examinar";
    } else {
      this.mensajeProgreso = "aún no está listo, siga practicando";
    }
  }
}
