import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IWordData } from '../../../models/word-data.interface';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';
import { RegisterWordModalFormComponent } from '../../forms/register-word-modal-form/register-word-modal-form.component';
import { UpdateWordModalFormComponent } from '../../forms/update-word-modal-form/update-word-modal-form.component';
import { IUpdateWordData } from '../../../models/update-word-data.interface';

@Component({
  selector: 'app-form-word-modal',
  imports: [RegisterWordModalFormComponent, UpdateWordModalFormComponent],
  templateUrl: './form-word-modal.component.html',
  styleUrl: './form-word-modal.component.css',
})
export class FormWordModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title: string = 'Confirmar Ação';
  @Input() word: IWordData | null = null;

  confirm(submittedData: IFormModalComponentOutput<IWordData | IUpdateWordData>): void {
    if (submittedData.cancelAction) {
      this.activeModal.dismiss();
      return;
    }
    this.activeModal.close(submittedData.value!);
  }
}
