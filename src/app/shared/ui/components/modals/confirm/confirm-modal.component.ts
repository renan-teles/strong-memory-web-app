import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() bodyMessage: string = 'Deseja continuar?';
  @Input() title: string = 'Confirmar';
  @Input() btnConfirmClass: string = 'btn-danger';
}
