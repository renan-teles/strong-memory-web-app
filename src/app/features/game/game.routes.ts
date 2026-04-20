import { Routes } from '@angular/router';

export const gameRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'start',
        title: 'SM - Iniciar Jogo',
        loadComponent: () =>
          import('./presentation/pages/start-game/start-game.page').then((m) => m.StartGamePage),
      },
      {
        path: 'about',
        title: 'SM - Sobre',
        loadComponent: () =>
          import('./presentation/pages/about-game/about-game.page').then((m) => m.AboutGamePage),
      },
      {
        path: 'play',
        title: 'SM - Jogar',
        loadComponent: () =>
          import('./presentation/pages/play-game/play-game.page').then((m) => m.PlayGamePage),
      },
    ],
  },
];
