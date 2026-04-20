import { Injectable } from '@angular/core';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';
import { NavbarLink } from '../../types/ui/navbar/navbar-link.interface';

@Injectable({
  providedIn: 'root',
})
export class NavbarLinkService {
  private readonly navLinks: NavbarLink[] = [
    {
      text: 'Jogar',
      accessRole: 'OPEN',
      path: '/app/game/start',
    },
    {
      text: 'Palavras',
      accessRole: 'ALL',
      path: '/app/words/list',
    },
    {
      text: 'Sugerir Palavra',
      accessRole: UserRole.PLAYER,
      path: '/app/suggestions/suggest',
    },
    {
      text: 'Sobre',
      accessRole: 'OPEN',
      path: '/app/game/about',
    },
    {
      text: 'Meu Painel',
      accessRole: UserRole.PLAYER,
      path: '/app/player/panel',
    },
    {
      text: 'Sugestão de Palavras',
      accessRole: UserRole.ADM,
      path: '/app/suggestions/list',
    },
  ];

  getLinksByUserRole(role: UserRole, includeOpens: boolean = false): NavbarLink[] {
    let links: NavbarLink[] = this.navLinks.filter(
      (l) => l.accessRole == role || l.accessRole === 'ALL',
    );

    if (includeOpens) {
      let openLinks: NavbarLink[] = this.navLinks.filter((l) => l.accessRole === 'OPEN');
      links = [...openLinks, ...links];
    }

    return links;
  }

  getOpenLinks(): NavbarLink[] {
    return this.navLinks.filter((l) => l.accessRole === 'OPEN');
  }
}
