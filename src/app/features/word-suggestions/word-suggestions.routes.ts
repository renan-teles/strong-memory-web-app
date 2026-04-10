import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const wordSuggestionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'suggest',
        title: 'SM - Sugerir Palavra',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./pages/suggest-word/suggest-word.page').then((m) => m.SuggestWordsPage),
        data: { roles: [UserRole.PLAYER] },
      },
      {
        path: 'list',
        title: 'SM - Sugestões de Palavras',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./pages/list-suggestions/list-word-suggestions.page').then(
            (m) => m.ListWordSuggestionsPage,
          ),
        data: { roles: [UserRole.ADM] },
      },
    ],
  },
];
