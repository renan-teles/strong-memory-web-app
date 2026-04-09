import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';

export const wordSuggestionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'suggest',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/suggest-word/suggest-word.page').then((m) => m.SuggestWordsPage),
        data: { roles: [UserRole.PLAYER] },
      },
      {
        path: 'list',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/list-suggestions/list-word-suggestions.page').then(
            (m) => m.ListWordSuggestionsPage,
          ),
        data: { roles: [UserRole.ADM] },
      },
    ],
  },
];
