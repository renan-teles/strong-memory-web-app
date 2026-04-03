import { UserRole } from '../../features/users/domain/enum/user-role.enum';

export interface INavbarLink {
  text: string;
  accessRole: UserRole.PLAYER | UserRole.ADM | 'ALL';
  path: string;
}
