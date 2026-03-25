import { Component, inject, Signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast/toast.service';
import { ToastMessage } from '../../models/toast-message.interface';

@Component({
  selector: 'app-toast',
  imports: [],
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private readonly toastService: ToastService = inject(ToastService);
  toasts: Signal<ToastMessage[]> = this.toastService.toasts;

  closeToasts(): void {
    this.toastService.clear();
  }
}
