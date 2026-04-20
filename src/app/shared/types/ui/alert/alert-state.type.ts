import { IconStatus } from '../icon-status.type';
import { AlertClass } from './alert-class.type';

export type AlertState = {
  alertClass: AlertClass;
  icon: IconStatus;
  message: string;
};
