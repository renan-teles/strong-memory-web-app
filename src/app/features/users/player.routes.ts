import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from './domain/enum/user-role.enum';

export const playerRoutes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { roles: [UserRole.PLAYER] },
    children: [
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/player/panel/player-panel.page').then((m) => m.PlayerPanelPage),
      },
    ],
  },
];
