import { Injectable, signal } from '@angular/core';
import { IAlertState } from '../../../shared/models/alert-state.interface';
import { AlertClass } from '../../../shared/types/alert-class.type';
import { IconStatus } from '../../../shared/types/icon-status.type';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly _alert = signal<IAlertState | null>(null);
  alert = this._alert.asReadonly();

  private timeout: number | null = null;

  success(message: string): void {
    return this.show('alert-success', 'bi-check-circle-fill', message);
  }

  error(message: string): void {
    return this.show('alert-danger', 'bi-x-circle-fill', message);
  }

  info(message: string): void {
    return this.show('alert-info', 'bi-info-circle-fill', message);
  }

  warning(message: string): void {
    return this.show('alert-warning', 'bi-exclamation-triangle-fill', message);
  }

  clear(): void {
    if (this.timeout) clearTimeout(this.timeout);
    this._alert.set(null);
  }

  private show(alertClass: AlertClass, icon: IconStatus, message: string): void {
    this._alert.set({
      alertClass,
      icon,
      message,
    });

    this.startTimeoutToClear();
  }

  private startTimeoutToClear(timeMillis: number = 4000): void {
    this.timeout = setTimeout(() => this.clear(), timeMillis);
  }
}
