import { Component, inject, Signal } from '@angular/core';
import { ToastMessage } from '../../../types/ui/toast/toast-message.interface';
import { ToastService } from '../../../services/toast/toast.service';

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
