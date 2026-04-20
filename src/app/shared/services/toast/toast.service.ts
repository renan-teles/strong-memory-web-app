import { Injectable, Signal, signal } from '@angular/core';
import { ToastMessage } from '../../types/ui/toast/toast-message.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<ToastMessage[]>([]);
  readonly toasts: Signal<ToastMessage[]> = this._toasts.asReadonly();

  private timeout: number = 0;

  show(toast: ToastMessage) {
    this._toasts.update((current) => [...current, toast]);

    this.timeout = setTimeout(() => {
      this._toasts.update((current) => current.slice(1));
    }, 3000);
  }

  showError(title: string, messages: string[]): void {
    this.show({
      title,
      messages,
      icon: 'bi-x-circle-fill',
      classname: 'text-danger',
    });
  }

  showWarning(title: string, messages: string[]): void {
    this.show({
      title,
      messages,
      icon: 'bi-exclamation-triangle-fill',
      classname: 'text-warning',
    });
  }

  showSuccess(title: string, messages: string[]): void {
    this.show({
      title,
      messages,
      icon: 'bi-check-circle-fill',
      classname: 'text-success',
    });
  }

  showNewHighestScore(title: string, messages: string[]): void {
    this.show({
      title,
      messages,
      icon: 'bi-star-fill',
      classname: 'text-warning',
    });
  }

  clear(): void {
    clearTimeout(this.timeout);
    this._toasts.set([]);
  }
}
