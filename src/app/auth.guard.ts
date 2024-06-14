import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const currentUser = usuarioService.getCurrentUser();
  if (currentUser) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
