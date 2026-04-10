import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest/guest.guard';
import { AuthenticatePlayerPage } from './pages/player/authenticate/authenticate-player.page';
import { AuthenticateAdministratorPage } from './pages/administrator/authenticate/authenticate-administrator.page';

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
