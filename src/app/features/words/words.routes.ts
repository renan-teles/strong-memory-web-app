import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth/auth.guard';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';

export const wordsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./pages/list-words/list-words.page').then((m) => m.ListWordsPage),
        data: { roles: [UserRole.PLAYER, UserRole.ADM] },
      },
    ],
  },
];
