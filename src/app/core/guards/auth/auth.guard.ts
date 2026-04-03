import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  if (authStorage.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/player/login']);
  return false;
};
