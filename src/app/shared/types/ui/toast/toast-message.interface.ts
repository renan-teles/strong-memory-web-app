import { IconStatus } from '../icon-status.type';

export interface ToastMessage {
  title: string;
  messages: string[];
  classname: string;
  icon: IconStatus | 'bi-star-fill';
}
