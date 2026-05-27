import { Routes } from '@angular/router';
import { UserRole } from '../users/domain/enums/user-role.enum';

export const dashboardsRoutes: Routes = [
  {
    path: 'overview',
    title: 'SM • Visão Geral',
    data: { roles: [UserRole.PLAYER] },
    loadComponent: () =>
      import('./match-history/presentation/pages/overview/overview-dashboard.page').then(
        (m) => m.OverviewDashboardPage,
      ),
  },
  {
    path: 'game',
    title: 'SM • Dados Sobre Jogo',
    data: { roles: [UserRole.PLAYER] },
    loadComponent: () =>
      import('./match-history/presentation/pages/game/game-dashboard.page').then(
        (m) => m.GameDashboardPage,
      ),
  },
  {
    path: 'performance',
    title: 'SM • Desempenho',
    data: { roles: [UserRole.PLAYER] },
    loadComponent: () =>
      import('./match-history/presentation/pages/performance/performance-dashboard.page').then(
        (m) => m.PerformanceDashboardPage,
      ),
  },
  {
    path: 'engagement',
    title: 'SM • Engajamento',
    data: { roles: [UserRole.PLAYER] },
    loadComponent: () =>
      import('./match-history/presentation/pages/engagement/engagement-dashboard.page').then(
        (m) => m.EngagementDashboardPage,
      ),
  },
];
