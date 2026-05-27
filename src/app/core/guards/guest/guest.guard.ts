import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';
import { AuthStateService } from '../../services/auth/auth-state.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authState: AuthStateService = inject(AuthStateService);

  if (!authState.isAuthenticated()) return true;

  switch (authState.getUserRole()) {
    case UserRole.PLAYER:
      router.navigate(['/home']);
      break;

    case UserRole.ADMIN:
      router.navigate(['/words/list']);
      break;
  }

  return false;
};
