import { AlertClass } from '../types/alert-class.type';
import { IconStatus } from '../types/icon-status.type';

export interface IAlertState {
  alertClass: AlertClass;
  icon: IconStatus;
  message: string;
}
