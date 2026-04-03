import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth/auth.guard';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';

export const gameRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.PLAYER] },
    children: [
      {
        path: 'start',
        loadComponent: () =>
          import('./pages/start-game/start-game.page').then((m) => m.StartGamePage),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about-game/about-game.page').then((m) => m.AboutGamePage),
      },
      {
        path: 'play',
        loadComponent: () => import('./pages/play-game/play-game.page').then((m) => m.PlayGamePage),
      },
    ],
  },
];
