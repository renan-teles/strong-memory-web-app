import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layouts/app/app-layout.component';
import { UserMessageLayoutComponent } from './core/layouts/user-message/user-message-layout.component';
import { NotAuthorizedPage } from './shared/pages/not-authorized/not-authorized.page';
import { NotFoundPage } from './shared/pages/not-found/not-found.page';

export const routes: Routes = [
  /* MAIN APP */
  {
    path: 'app',
    component: AppLayoutComponent,
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
    title: 'SM - Autenticação de Usuário',
    loadChildren: () => import('./features/auth/auth-users.routes').then((m) => m.authRoutes),
  },
  {
    path: 'register-user',
    title: 'SM - Cadastro de Usuário',
    loadChildren: () =>
      import('./features/auth/register-users.routes').then((m) => m.registerUserRoutes),
  },

  /* DEFAULTS */
  {
    path: '',
    component: UserMessageLayoutComponent,
    children: [
      {
        path: 'not-authorized',
        title: 'SM - Nível de Acesso Inválido',
        component: NotAuthorizedPage,
      },
      { path: 'not-found', title: 'SM - Página não Encontrada', component: NotFoundPage },
      { path: '', redirectTo: '/app/game/start', pathMatch: 'full' },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
];
