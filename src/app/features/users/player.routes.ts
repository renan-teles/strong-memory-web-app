import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from './domain/enums/user-role.enum';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const playerRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.PLAYER] },
    children: [
      {
        path: 'panel',
        title: 'SM • Meu Painel',
        loadComponent: () =>
          import('./presentation/pages/player/panel/player-panel.page').then(
            (m) => m.PlayerPanelPage,
          ),
      },
    ],
  },
];
