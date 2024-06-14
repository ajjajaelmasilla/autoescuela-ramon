import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';
import { ResultadoService } from '../../services/resultado.service';
import { ProgresoService } from '../../services/progreso.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  selectedDificultad: number | 'todas' = 'todas';

  constructor(public testService: TestService, private resultadoService: ResultadoService, private progresoService: ProgresoService) {}

  ngOnInit(): void {
    this.tests = this.testService.obtenerTests();
    this.filteredTests = this.tests;
  }

  filterTests(): void {
    if (this.selectedDificultad === 'todas') {
      this.filteredTests = this.tests;
    } else {
      this.filteredTests = this.tests.filter(test => test.dificultad === this.selectedDificultad);
    }
  }

  getUltimoIntento(testId: number): { correctas: number; total: number; date: string; id: number } | undefined {
    return this.resultadoService.obtenerUltimoResultado(testId);
  }

  getProgreso(testId: number) {
    return this.progresoService.obtenerProgreso(testId);
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
