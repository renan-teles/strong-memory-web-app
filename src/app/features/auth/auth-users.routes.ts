import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest/guest.guard';
import { AuthenticatePlayerPage } from './presentation/pages/player/auth/authenticate-player.page';
import { AuthenticateAdministratorPage } from './presentation/pages/administrator/auth/authenticate-administrator.page';

export const authRoutes: Routes = [
  {
    path: 'player',
    component: AuthenticatePlayerPage,
    canActivate: [guestGuard],
  },
  {
    path: 'administrator',
    component: AuthenticateAdministratorPage,
    canActivate: [guestGuard],
  },
];
