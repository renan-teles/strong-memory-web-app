import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../ui/components/modals/confirm/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private modal: NgbModal = inject(NgbModal);

  confirm(title: string, message: string, btnClass: string) {
    const ref = this.modal.open(ConfirmModalComponent, {
      centered: true,
    });

    ref.componentInstance.title = title;
    ref.componentInstance.bodyMessage = message;
    ref.componentInstance.btnConfirmClass = btnClass;

    return ref.result;
  }
}
