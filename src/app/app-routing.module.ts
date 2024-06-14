import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './auth.guard';
import { authRedirectGuard } from './auth-redirect.guard';
import { HistorialComponent } from './components/historial/historial.component';
import { LoginComponent } from './components/login/login.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { ExamenComponent } from './components/examen/examen.component';
import { ProgresoComponent } from './components/progreso/progreso.component';
import { TemasComponent } from './components/temas/temas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authRedirectGuard] },
  { path: 'tests/:id', component: ExamenComponent, canActivate: [authGuard] },
  { path: 'tests', component: ExamenesComponent, canActivate: [authGuard] },
  { path: 'historial', component: HistorialComponent, canActivate: [authGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [authRedirectGuard] },
  { path: 'temas', component: TemasComponent, canActivate: [authGuard] },
  { path: 'progreso', component: ProgresoComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
