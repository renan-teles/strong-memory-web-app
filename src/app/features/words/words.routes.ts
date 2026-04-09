import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role/role.guard';
import { UserRole } from '../users/domain/enum/user-role.enum';

export const wordsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canActivate: [roleGuard],
        loadComponent: () =>
          import('./pages/list-words/list-words.page').then((m) => m.ListWordsPage),
        data: { roles: [UserRole.PLAYER, UserRole.ADM] },
      },
    ],
  },
];
