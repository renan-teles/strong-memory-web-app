import { Routes } from '@angular/router';
import { MainPageLayoutComponent } from './core/layouts/main-page/main-page-layout.component';
import { NotFoundPage } from './shared/pages/not-found/not-found.page';
import { NotAuthorizedPage } from './shared/pages/not-authorized/not-authorized.page';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  /* MAIN APP */
  {
    path: 'app',
    canActivate: [authGuard],
    component: MainPageLayoutComponent,
    children: [
      {
        path: 'game',
        loadChildren: () => import('./features/game/game.routes').then((m) => m.gameRoutes),
      },
      {
        path: 'words',
        loadChildren: () => import('./features/words/words.routes').then((m) => m.wordsRoutes),
      },
      {
        path: 'suggestions',
        loadChildren: () =>
          import('./features/word-suggestions/word-suggestions.routes').then(
            (m) => m.wordSuggestionsRoutes,
          ),
      },
      {
        path: 'player',
        loadChildren: () => import('./features/users/player.routes').then((m) => m.playerRoutes),
      },
    ],
  },

  /* AUTH */
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-users.routes').then((m) => m.authRoutes),
  },
  {
    path: 'register-user',
    loadChildren: () =>
      import('./features/users/register-users.routes').then((m) => m.registerUserRoutes),
  },

  /* DEFAULTS */
  {
    path: '',
    component: MainPageLayoutComponent,
    children: [
      { path: '', redirectTo: 'app/game/start', pathMatch: 'full' },
      { path: 'not-authorized', component: NotAuthorizedPage },
      { path: 'not-found', component: NotFoundPage },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
];
