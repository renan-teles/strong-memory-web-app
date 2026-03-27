import { Injectable } from '@angular/core';
import { INavbarLink } from '../../../shared/models/nvabar-link.interface';

@Injectable({
  providedIn: 'root',
})
export class NavbarLinkService {
  private readonly navLinks: INavbarLink[] = [
    {
      text: 'Jogar',
      accessRole: 'ROLE_PLAYER',
      path: '/game/start',
    },
    {
      text: 'Palavras',
      accessRole: 'ALL',
      path: '/words/registered',
    },
    {
      text: 'Sugerir de Palavras',
      accessRole: 'ROLE_PLAYER',
      path: '/words/suggestion',
    },
    {
      text: 'Sobre',
      accessRole: 'ROLE_PLAYER',
      path: '/game/about',
    },
    {
      text: 'Meu Painel',
      accessRole: 'ROLE_PLAYER',
      path: '/player/panel',
    },
    {
      text: 'Sugestão de Palavras',
      accessRole: 'ROLE_ADMINISTRATOR',
      path: '/words/view-suggestions/',
    },
  ];

  getPlayerLinks(): INavbarLink[] {
    return this.navLinks.filter((l) => {
      return l.accessRole == 'ROLE_PLAYER' || l.accessRole == 'ALL';
    });
  }

  getAdministratorLinks(): INavbarLink[] {
    return this.navLinks.filter((l) => {
      return l.accessRole === 'ROLE_ADMINISTRATOR' || l.accessRole === 'ALL';
    });
  }

  getLinksByRole(role: string): INavbarLink[] {
    switch (role) {
      case 'ROLE_ADMINISTRATOR':
        return this.getAdministratorLinks();

      case 'ROLE_PLAYER':
        return this.getPlayerLinks();

      default:
        return [];
    }
  }
}
