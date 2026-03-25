import { Component, inject, Signal } from '@angular/core';
import { IAlertState } from '../../models/alert-state.interface';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  standalone: true,
})
export class AlertComponent {
  private readonly service: AlertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.service.alert;

  close(): void {
    this.service.clear();
  }
}
