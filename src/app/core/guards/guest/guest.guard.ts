import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  if (authStorage.isAuthenticated()) {
    router.navigate(['/game/start']);
    return false;
  }
  return true;
};
