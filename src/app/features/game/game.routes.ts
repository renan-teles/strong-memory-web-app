import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const gameRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.PLAYER] },
    children: [
      {
        path: 'start',
        title: 'SM - Iniciar Jogo',
        loadComponent: () =>
          import('./pages/start-game/start-game.page').then((m) => m.StartGamePage),
      },
      {
        path: 'about',
        title: 'SM - Sobre',
        loadComponent: () =>
          import('./pages/about-game/about-game.page').then((m) => m.AboutGamePage),
      },
      {
        path: 'play',
        title: 'SM - Jogar',
        loadComponent: () => import('./pages/play-game/play-game.page').then((m) => m.PlayGamePage),
      },
    ],
  },
];
