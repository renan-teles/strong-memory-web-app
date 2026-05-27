import { Routes } from '@angular/router';
import { confirmExitGuard } from '../../core/guards/confirm-exit/confirm-exit-guard';

export const gameRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'play',
        title: 'SM - Jogar',
        canDeactivate: [confirmExitGuard],
        loadComponent: () =>
          import('./presentation/pages/play-game/play-game.page').then((m) => m.PlayGamePage),
      },
    ],
  },
];
