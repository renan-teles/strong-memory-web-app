import { Component, inject, Signal } from '@angular/core';
import { AlertService } from '../../../services/alert/alert.service';
import { AlertState } from '../../../types/ui/alert/alert-state.type';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  standalone: true,
})
export class AlertComponent {
  private readonly service: AlertService = inject(AlertService);
  alert: Signal<AlertState | null> = this.service.alert;

  close(): void {
    this.service.clear();
  }
}
