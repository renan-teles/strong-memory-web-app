import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../../services/auth/auth-state.service';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authState: AuthStateService = inject(AuthStateService);

  const userRole: UserRole | null = authState.getUserRole();
  const path: string = '/not-authorized';

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
