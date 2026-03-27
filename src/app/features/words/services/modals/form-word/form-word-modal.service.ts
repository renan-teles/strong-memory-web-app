import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IWordData } from '../../../models/word-data.interface';
import { FormWordModalComponent } from '../../../components/modals/form-word/form-word-modal.component';

@Injectable({
  providedIn: 'root',
})
export class FormWordModalService {
  private modal: NgbModal = inject(NgbModal);

  confirm(title: string, word: IWordData | null = null) {
    const ref = this.modal.open(FormWordModalComponent, {
      centered: true,
    });

    ref.componentInstance.title = title;
    ref.componentInstance.word = word;

    return ref.result;
  }
}
