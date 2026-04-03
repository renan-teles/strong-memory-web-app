import { Injectable } from '@angular/core';
import { INavbarLink } from '../../../shared/models/nvabar-link.interface';
import { UserRole } from '../../../features/users/domain/enum/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class NavbarLinkService {
  private readonly navLinks: INavbarLink[] = [
    {
      text: 'Jogar',
      accessRole: UserRole.PLAYER,
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
      accessRole: UserRole.PLAYER,
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

  getPlayerLinks(): INavbarLink[] {
    return this.navLinks.filter((l) => {
      return l.accessRole == UserRole.PLAYER || l.accessRole == 'ALL';
    });
  }

  getAdministratorLinks(): INavbarLink[] {
    return this.navLinks.filter((l) => {
      return l.accessRole === UserRole.ADM || l.accessRole === 'ALL';
    });
  }

  getLinksByRole(role: string): INavbarLink[] {
    switch (role) {
      case UserRole.ADM:
        return this.getAdministratorLinks();

      case UserRole.PLAYER:
        return this.getPlayerLinks();

      default:
        return [];
    }
  }
}
