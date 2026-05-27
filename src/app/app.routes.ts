import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layouts/app/app-layout.component';
import { UserMessageLayoutComponent } from './core/layouts/user-message/user-message-layout.component';
import { NotAuthorizedPage } from './shared/pages/not-authorized/not-authorized.page';
import { NotFoundPage } from './shared/pages/not-found/not-found.page';

export const routes: Routes = [
  /* AUTH */
  {
    path: 'login',
    title: 'SM • Autenticação de Usuários',
    loadChildren: () => import('./features/auth/auth-users.routes').then((m) => m.authRoutes),
  },

  /* MAIN APP */
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        title: 'SM • Home',
        loadComponent: () =>
          import('./features/public/presentation/pages/home/home.page').then((m) => m.HomePage),
      },

      {
        path: 'about',
        title: 'SM • Sobre',
        loadComponent: () =>
          import('./features/public/presentation/pages/about/about.page').then((m) => m.AboutPage),
      },

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

      {
        path: 'dashboards',
        loadChildren: () =>
          import('./features/dashboards/dashboards.routes').then((m) => m.dashboardsRoutes),
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
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: '**', redirectTo: 'not-found' },
        ],
      },
    ],
  },
];
