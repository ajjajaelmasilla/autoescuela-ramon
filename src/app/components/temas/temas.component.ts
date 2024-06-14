import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';
import { ResultadoService } from '../../services/resultado.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
  temarioTests: { [key: string]: Test[] } = {};
  objectKeys = Object.keys;

  constructor(private testService: TestService, private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.temarioTests = this.testService.obtenerTemarioTests();
  }

  getUltimoIntento(testId: number): { correctas: number; total: number; date: string; id: number } | undefined {
    return this.resultadoService.obtenerUltimoResultado(testId);
  }

  getStars(dificultad: number): { icon: string, colorClass: string }[] {
    const stars = Array(5).fill({ icon: 'star_border', colorClass: 'star-border' });
    for (let i = 0; i < dificultad; i++) {
      stars[i] = {
        icon: 'star',
        colorClass: this.getColorClass(dificultad)
      };
    }
    return stars;
  }

  getColorClass(dificultad: number): string {
    if (dificultad <= 2) {
      return 'star-green';
    } else if (dificultad <= 4) {
      return 'star-yellow';
    } else {
      return 'star-red';
    }
  }
}
