import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest/guest.guard';
import { AuthUserPage } from './presentation/pages/auth-user/auth-user.page';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthUserPage,
    canActivate: [guestGuard],
  },
];
