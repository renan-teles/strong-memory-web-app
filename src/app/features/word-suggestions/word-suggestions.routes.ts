import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enums/user-role.enum';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const wordSuggestionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'suggest',
        title: 'SM - Sugerir Palavra',
        canActivate: [authGuard, roleGuard],
        data: { roles: [UserRole.PLAYER] },
        loadComponent: () =>
          import('./presentation/pages/suggest-word/suggest-word.page').then(
            (m) => m.SuggestWordsPage,
          ),
      },
      {
        path: 'list',
        title: 'SM - Sugestões de Palavras',
        canActivate: [authGuard, roleGuard],
        data: { roles: [UserRole.ADMIN] },
        loadComponent: () =>
          import('./presentation/pages/list-suggestions/list-word-suggestions.page').then(
            (m) => m.ListWordSuggestionsPage,
          ),
      },
    ],
  },
];
