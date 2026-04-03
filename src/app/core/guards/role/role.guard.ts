import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../../services/auth-storage/auth-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStorage = inject(AuthStorageService);

  const userRole = authStorage.getUserRole();
  const path = '/not-authorized';

  if (!userRole) {
    router.navigate([path]);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as Array<string>;
  if (allowedRoles.includes(userRole!)) {
    return true;
  }

  router.navigate([path]);
  return false;
};
