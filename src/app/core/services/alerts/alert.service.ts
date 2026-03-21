import { Injectable, signal } from '@angular/core';
import { IAlertState } from '../../../shared/models/alert-state.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly _alert = signal<IAlertState | null>(null);
  alert = this._alert.asReadonly();

  private timeout: number | null = null;

  success(message: string): AlertService {
    this._alert.set({
      alertClass: 'alert-success',
      alertIcon: 'bi-check-circle-fill',
      message,
    });
    return this;
  }

  error(message: string): AlertService {
    this._alert.set({
      alertClass: 'alert-danger',
      alertIcon: 'bi-x-circle-fill',
      message,
    });
    return this;
  }

  info(message: string): AlertService {
    this._alert.set({
      alertClass: 'alert-info',
      alertIcon: 'bi-info-circle-fill',
      message,
    });
    return this;
  }

  warning(message: string): AlertService {
    this._alert.set({
      alertClass: 'alert-warning',
      alertIcon: 'bi-exclamation-triangle-fill',
      message,
    });
    return this;
  }

  startTimeoutToClear(timeMillis: number = 5000) {
    this.timeout = setTimeout(() => this.clear(), timeMillis);
  }

  clear(): void {
    if (this.timeout) clearTimeout(this.timeout);
    this._alert.set(null);
  }
}
