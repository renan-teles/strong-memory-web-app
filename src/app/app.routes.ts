import { Routes } from '@angular/router';
import { AuthenticatePlayerPage } from './features/users/player/pages/authenticate-player/authenticate-player.page';
import { RegisterPlayerPage } from './features/users/player/pages/register-player/register-player.page';
import { MainPageLayoutComponent } from './core/layouts/main-page/main-page-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageLayoutComponent,
    children: [
      /* Game Routes */
      {
        path: 'game/start',
        loadComponent: () =>
          import('./features/game/pages/start-game/start-game.page').then((m) => m.StartGamePage),
      },
      {
        path: 'game/about',
        loadComponent: () =>
          import('./features/game/pages/about-game/about-game.page').then((m) => m.AboutGamePage),
      },
      {
        path: 'game/play',
        loadComponent: () =>
          import('./features/game/pages/play-game/play-game.page').then((m) => m.PlayGamePage),
      },

      /* Words Routes */
      {
        path: 'words/registered',
        loadComponent: () =>
          import('./features/words/pages/registered-words/registered-words.page').then(
            (m) => m.RegisteredWordsPage,
          ),
      },
      {
        path: 'words/suggestion',
        loadComponent: () =>
          import('./features/words/pages/word-suggestion/word-suggestion.page').then(
            (m) => m.WordSuggestionPage,
          ),
      },

      /* Player Routes */
      {
        path: 'player/panel',
        loadComponent: () =>
          import('./features/users/player/pages/player-panel/player-panel.page').then(
            (m) => m.PlayerPanelPage,
          ),
      },

      /* Default Routes */
      { path: '', redirectTo: 'game/start', pathMatch: 'full' },
    ],
  },

  /* Auth User Routes */
  {
    path: 'player/login',
    component: AuthenticatePlayerPage,
  },
  {
    path: 'player/register',
    component: RegisterPlayerPage,
  },

  /* Default Routes */
  { path: '**', redirectTo: 'game/start', pathMatch: 'full' },
];
