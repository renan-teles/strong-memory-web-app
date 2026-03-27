import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';
import { WordSuggestionsModalFormComponent } from '../../form/word-suggestions-modal-form/word-suggestions-modal-form.component';

@Component({
  selector: 'app-form-word-suggestion-modal',
  imports: [WordSuggestionsModalFormComponent],
  templateUrl: './form-word-suggestion-modal.component.html',
  styleUrl: './form-word-suggestion-modal.component.css',
})
export class FormWordSuggestionModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title: string = 'Confirmar Ação';
  @Input() suggestionWord: IWordSuggestionData | null = null;

  confirm(submittedData: IFormModalComponentOutput<IWordSuggestionData>): void {
    if (submittedData.cancelAction) {
      this.activeModal.dismiss();
      return;
    }
    this.activeModal.close(submittedData.value!);
  }
}
