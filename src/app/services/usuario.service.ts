import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private currentUser: Usuario | null = null;

  constructor() {
    this.loadUsuarios();
    this.loadCurrentUser();
  }

  private loadUsuarios(): void {
    const usuariosJson = localStorage.getItem('usuarios');
    if (usuariosJson) {
      this.usuarios = JSON.parse(usuariosJson);
    }
  }

  private saveUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  private loadCurrentUser(): void {
    const currentUserJson = localStorage.getItem('currentUser');
    if (currentUserJson) {
      this.currentUser = JSON.parse(currentUserJson);
    }
  }

  private saveCurrentUser(): void {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  registro(usuario: Usuario): boolean {
    if (this.usuarios.find(u => u.nif === usuario.nif)) {
      return false;
    } else {
      usuario.id = this.usuarios.length + 1;
      this.usuarios.push(usuario);
      this.saveUsuarios();
      return true;
    }
  }

  login(nif: string, contrasena: string): boolean {
    const user = this.usuarios.find(u => u.nif === nif && u.contrasena === contrasena);
    if (user) {
      this.currentUser = user;
      this.saveCurrentUser();
      return true;
    }
    return false;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    this.saveCurrentUser();
  }
}
