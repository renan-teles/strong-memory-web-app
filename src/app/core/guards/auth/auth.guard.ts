import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../../services/auth/auth-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authState: AuthStateService = inject(AuthStateService);

  if (authState.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
