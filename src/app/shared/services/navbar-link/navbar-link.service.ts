import { Injectable } from '@angular/core';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';
import { NavbarLink } from '../../types/ui/navbar/navbar-link.interface';

@Injectable({
  providedIn: 'root',
})
export class NavbarLinkService {
  private readonly navLinks: NavbarLink[] = [
    {
      text: 'Início',
      accessRole: 'ALL',
      needsAuth: false,
      path: '/home',
      order: 1,
    },
    {
      text: 'Palavras',
      accessRole: 'ALL',
      needsAuth: true,
      path: '/words/list',
      order: 3,
    },
    {
      text: 'Sugerir Palavra',
      accessRole: UserRole.PLAYER,
      needsAuth: true,
      path: '/suggestions/suggest',
      order: 4,
    },
    {
      text: 'Sobre',
      accessRole: 'ALL',
      needsAuth: false,
      path: '/about',
      order: 5,
    },
    {
      text: 'Meu Painel',
      accessRole: UserRole.PLAYER,
      path: '/player/panel',
      needsAuth: true,
      order: 6,
    },
    {
      text: 'Sugestão de Palavras',
      accessRole: UserRole.ADMIN,
      needsAuth: true,
      path: '/suggestions/list',
      order: 7,
    },
    {
      text: 'Dashboards',
      accessRole: UserRole.PLAYER,
      path: '/dashboards',
      needsAuth: true,
      order: 2,
      childrens: [
        {
          text: 'Visão Geral',
          accessRole: UserRole.PLAYER,
          needsAuth: true,
          path: '/overview',
          order: 1,
        },
        {
          text: 'Jogo',
          accessRole: UserRole.PLAYER,
          needsAuth: true,
          path: '/game',
          order: 2,
        },
        {
          text: 'Performance',
          accessRole: UserRole.PLAYER,
          needsAuth: true,
          path: '/performance',
          order: 3,
        },
        {
          text: 'Engajamento',
          accessRole: UserRole.PLAYER,
          needsAuth: true,
          path: '/engagement',
          order: 4,
        },
      ],
    },
  ];

  getByUserRole(role: UserRole, includeOpens: boolean = false): NavbarLink[] {
    let links: NavbarLink[] = this.navLinks.filter(
      (l) => l.accessRole === role || (l.accessRole === 'ALL' && l.needsAuth),
    );

    if (includeOpens) {
      const openLinks: NavbarLink[] = this.getOpenLinks();
      links = [...links, ...openLinks];
    }

    return this.sortLinks(links);
  }

  getAdminLinks(): NavbarLink[] {
    return this.getByUserRole(UserRole.ADMIN, false);
  }

  getPlayerLinks(): NavbarLink[] {
    return this.getByUserRole(UserRole.PLAYER, true);
  }

  getOpenLinks(): NavbarLink[] {
    return this.navLinks.filter((l) => !l.needsAuth);
  }

  private sortLinks(links: NavbarLink[]): NavbarLink[] {
    return links.sort((a, b) => a.order - b.order);
  }
}
