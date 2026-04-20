import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WordSuggestionRequest } from '../../../../data/dto/request/word-suggestion-request';
import { FormWordSuggestionModalComponent } from '../../../components/modals/form-word-suggestion/form-word-suggestion-modal.component';

@Injectable({
  providedIn: 'root',
})
export class FormWordSuggestionModalService {
  private modal: NgbModal = inject(NgbModal);

  confirm(title: string, suggestion: WordSuggestionRequest) {
    const ref = this.modal.open(FormWordSuggestionModalComponent, {
      centered: true,
    });

    ref.componentInstance.title = title;
    ref.componentInstance.suggestionWord = suggestion;

    return ref.result;
  }
}
