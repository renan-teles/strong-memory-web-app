import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WordFormComponent } from '../../forms/word-form/word-form.component';
import { IWordData } from '../../../models/word-data.interface';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';

@Component({
  selector: 'app-form-word-modal',
  imports: [WordFormComponent],
  templateUrl: './form-word-modal.component.html',
  styleUrl: './form-word-modal.component.css',
})
export class FormWordModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title: string = 'Confirmar Ação';
  @Input() word: IWordData | null = null;

  confirm(submittedData: IFormModalComponentOutput<IWordData>): void {
    if (submittedData.cancelAction) {
      this.activeModal.dismiss();
      return;
    }
    this.activeModal.close(submittedData.value!);
  }
}
