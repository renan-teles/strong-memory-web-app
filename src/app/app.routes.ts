import { Routes } from '@angular/router';
import { AuthenticatePlayerPage } from './features/users/pages/authenticate-player/authenticate-player.page';
import { RegisterPlayerPage } from './features/users/pages/register-player/register-player.page';
import { MainPageLayoutComponent } from './core/layouts/main-page/main-page-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { roleGuard } from './core/guards/role/role.guard';
import { guestGuard } from './core/guards/guest/guest.guard';

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
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PLAYER'] },
      },
      {
        path: 'game/about',
        loadComponent: () =>
          import('./features/game/pages/about-game/about-game.page').then((m) => m.AboutGamePage),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PLAYER'] },
      },
      {
        path: 'game/play',
        loadComponent: () =>
          import('./features/game/pages/play-game/play-game.page').then((m) => m.PlayGamePage),
        // canActivate: [authGuard, roleGuard],
        // data: { roles: ['ROLE_PLAYER'] },
      },

      /* Words Routes */
      {
        path: 'words/registered',
        loadComponent: () =>
          import('./features/words/pages/registered/registered-words.page').then(
            (m) => m.RegisteredWordsPage,
          ),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PLAYER'] },
      },
      {
        path: 'words/suggestion',
        loadComponent: () =>
          import('./features/word-suggestions/pages/suggestions/word-suggestion.page').then(
            (m) => m.WordSuggestionPage,
          ),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PLAYER'] },
      },

      /* Player Routes */
      {
        path: 'player/panel',
        loadComponent: () =>
          import('./features/users/pages/player-panel/player-panel.page').then(
            (m) => m.PlayerPanelPage,
          ),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ROLE_PLAYER'] },
      },

      /* Default Routes */
      { path: '', redirectTo: 'game/start', pathMatch: 'full' },
    ],
  },

  /* Auth User Routes */
  {
    path: 'player/login',
    component: AuthenticatePlayerPage,
    canActivate: [guestGuard],
  },
  {
    path: 'player/register',
    component: RegisterPlayerPage,
    canActivate: [guestGuard],
  },

  /* Default Routes */
  { path: '**', redirectTo: 'game/start', pathMatch: 'full' },
];
