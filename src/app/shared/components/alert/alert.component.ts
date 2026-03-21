import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlertState } from '../../models/alert-state.interface';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  standalone: true,
})
export class AlertComponent {
  @Input({ required: true }) alertState!: IAlertState;
  @Output() closed = new EventEmitter<void>();

  componentClass!: string;
  icon!: string;
  message!: string;

  ngOnInit(): void {
    this.componentClass = this.alertState.alertClass;
    this.icon = this.alertState.alertIcon;
    this.message = this.alertState.message;
  }

  close(): void {
    this.closed.emit();
  }
}
