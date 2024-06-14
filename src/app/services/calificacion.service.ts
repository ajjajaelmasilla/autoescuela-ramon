import { Injectable } from '@angular/core';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private calificaciones: Calificacion[] = [];

  constructor() {
    this.loadCalificaciones();
  }

  private loadCalificaciones(): void {
    const calificacionesJson = localStorage.getItem('calificaciones');
    if (calificacionesJson) {
      this.calificaciones = JSON.parse(calificacionesJson);
    }
  }

  private saveCalificaciones(): void {
    localStorage.setItem('calificaciones', JSON.stringify(this.calificaciones));
  }

  getCalificaciones(userId: number): Calificacion[] {
    return this.calificaciones.filter(c => c.userId === userId);
  }

  addCalificacion(calificacion: Calificacion): void {
    calificacion.id = this.calificaciones.length + 1;
    this.calificaciones.push(calificacion);
    this.saveCalificaciones();
  }
}
