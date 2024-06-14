import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const currentUser = usuarioService.getCurrentUser();
  if (currentUser) {
    router.navigate(['/tests']);
    return false;
  } else {
    return true;
  }
};
