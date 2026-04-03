import { IconStatus } from '../types/icon-status.type';

export interface ToastMessage {
  title: string;
  messages: string[];
  classname: string;
  icon: IconStatus | 'bi-star-fill';
}
