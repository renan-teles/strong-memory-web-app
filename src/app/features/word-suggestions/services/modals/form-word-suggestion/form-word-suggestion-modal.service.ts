import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { FormWordSuggestionModalComponent } from '../../../components/modals/form-word-suggestion/form-word-suggestion-modal.component';

@Injectable({
  providedIn: 'root',
})
export class FormWordSuggestionModalService {
  private modal: NgbModal = inject(NgbModal);

  confirm(title: string, suggestion: IWordSuggestionData) {
    const ref = this.modal.open(FormWordSuggestionModalComponent, {
      centered: true,
    });

    ref.componentInstance.title = title;
    ref.componentInstance.suggestionWord = suggestion;

    return ref.result;
  }
}
