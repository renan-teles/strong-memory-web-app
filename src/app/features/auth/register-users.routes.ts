import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest/guest.guard';
import { RegisterAdministratorPage } from './presentation/pages/administrator/register/register-administrator.page';
import { RegisterPlayerPage } from './presentation/pages/player/register/register-player.page';

export const registerUserRoutes: Routes = [
  {
    path: 'player',
    component: RegisterPlayerPage,
    canActivate: [guestGuard],
  },
  {
    path: 'administrator',
    component: RegisterAdministratorPage,
    canActivate: [guestGuard],
  },
];
