import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';
import { UserRole } from '../../../features/users/domain/enum/user-role.enum';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  if (!authStorage.isAuthenticated()) return true;

  switch (authStorage.getUserRole()) {
    case UserRole.PLAYER:
      router.navigate(['/app/game/start']);
      break;

    case UserRole.ADM:
      router.navigate(['/app/words/list']);
      break;
  }

  return false;
};
