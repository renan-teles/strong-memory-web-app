import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  if (authStorage.isAuthenticated()) {
    switch (authStorage.getUserRole()) {
      case 'ROLE_PLAYER':
        router.createUrlTree(['/game/start']);
        break;

      case 'ROLE_ADMINISTRATOR':
        router.createUrlTree(['/words/registered']);
        break;
    }

    return false;
  }

  return true;
};
