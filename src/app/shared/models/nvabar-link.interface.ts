export interface INavbarLink {
  text: string;
  accessRole: 'ROLE_PLAYER' | 'ROLE_ADMINISTRATOR' | 'ALL';
  path: string;
}
