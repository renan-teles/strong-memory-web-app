import { UserRole } from '../../../../features/users/domain/enums/user-role.enum';

export interface NavbarLink {
  text: string;
  accessRole: UserRole.PLAYER | UserRole.ADM | 'ALL' | 'OPEN';
  path: string;
}
