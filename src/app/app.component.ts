import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.usuarioService.getCurrentUser() !== null;
  }

  getUsername(): string {
    const user = this.usuarioService.getCurrentUser();
    return user ? user.nombre : '';
  }

  getNIF(): string {
    const user = this.usuarioService.getCurrentUser();
    return user ? user.nif : '';
  }
  
  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
