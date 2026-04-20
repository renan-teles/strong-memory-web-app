import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WordSuggestionsModalFormComponent } from '../../form/word-suggestions/word-suggestions-modal-form/word-suggestions-modal-form.component';
import { WordSuggestionRequest } from '../../../../data/dto/request/word-suggestion-request';
import { FormModalComponentOutput } from '../../../../../../shared/types/ui/forms/form-modal-component-output.interface';

@Component({
  selector: 'app-form-word-suggestion-modal',
  imports: [WordSuggestionsModalFormComponent],
  templateUrl: './form-word-suggestion-modal.component.html',
  styleUrl: './form-word-suggestion-modal.component.css',
})
export class FormWordSuggestionModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title: string = 'Confirmar Ação';
  @Input() suggestionWord: WordSuggestionRequest | null = null;

  confirm(submittedData: FormModalComponentOutput<WordSuggestionRequest>): void {
    if (submittedData.cancelAction) {
      this.activeModal.dismiss();
      return;
    }
    this.activeModal.close(submittedData.value!);
  }
}
