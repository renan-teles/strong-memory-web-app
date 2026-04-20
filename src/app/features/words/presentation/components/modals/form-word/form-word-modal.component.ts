import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterWordModalFormComponent } from '../../forms/register-word-modal-form/register-word-modal-form.component';
import { UpdateWordModalFormComponent } from '../../forms/update-word-modal-form/update-word-modal-form.component';
import { WordRequest } from '../../../../data/dto/request/word-request';
import { UpdateWordRequest } from '../../../../data/dto/request/update-word-request';
import { FormModalComponentOutput } from '../../../../../../shared/types/ui/forms/form-modal-component-output.interface';

@Component({
  selector: 'app-form-word-modal',
  imports: [RegisterWordModalFormComponent, UpdateWordModalFormComponent],
  templateUrl: './form-word-modal.component.html',
  styleUrl: './form-word-modal.component.css',
})
export class FormWordModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title: string = 'Confirmar Ação';
  @Input() word: WordRequest | null = null;

  confirm(submittedData: FormModalComponentOutput<WordRequest | UpdateWordRequest>): void {
    if (submittedData.cancelAction) {
      this.activeModal.dismiss();
      return;
    }
    this.activeModal.close(submittedData.value!);
  }
}
