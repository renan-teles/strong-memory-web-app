import { AccessRoleNavbarLink } from './access-role-navbar-link.type';

export interface NavbarLink {
  text: string;
  accessRole: AccessRoleNavbarLink;
  needsAuth: boolean;
  path: string;
  order: number;
  childrens?: NavbarLink[];
}
