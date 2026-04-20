import { AuthFormConfig } from './auth-form-config.type';
import { AuthFormRole } from './auth-form-role.type';

export const AUTH_FORM_CONFIG: Record<AuthFormRole, AuthFormConfig> = {
  'auth-administrator': {
    link: {
      text: 'Não tem conta de administrador? Crie sua conta aqui',
      redirectPath: '/register-user/administrator',
    },
    inverseLink: {
      text: 'Entrar como jogador',
      redirectPath: '/auth/player',
    },
  },

  'auth-player': {
    link: {
      text: 'Não tem conta? Crie sua conta aqui',
      redirectPath: '/register-user/player',
    },
    inverseLink: {
      text: 'Entrar como administrador',
      redirectPath: '/auth/administrator',
    },
  },

  'register-administrator': {
    link: {
      text: 'Já tem conta de administrador? Entre com ela aqui',
      redirectPath: '/auth/administrator',
    },
    inverseLink: {
      text: 'Me registrar como jogador',
      redirectPath: '/register-user/player',
    },
  },

  'register-player': {
    link: {
      text: 'Já tem conta? Entre com ela aqui.',
      redirectPath: '/auth/player',
    },
    inverseLink: {
      text: 'Me registrar como administrador',
      redirectPath: '/register-user/administrator',
    },
  },
};
