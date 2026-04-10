import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const wordsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        title: 'SM - Palavras',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./pages/list-words/list-words.page').then((m) => m.ListWordsPage),
        data: { roles: [UserRole.PLAYER, UserRole.ADM] },
      },
    ],
  },
];
