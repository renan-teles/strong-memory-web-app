import { Component, inject, OnDestroy } from '@angular/core';
import { CrudWordSuggestionsUiFacade } from '../../facades/ui/crud/crud-word-suggestions-ui.facade.js';
import { AlertService } from '../../../../core/services/alert/alert.service.js';
import { WordSuggestionsFormComponent } from '../../components/form/word-suggestions-form/word-suggestions-form.component';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface.js';

@Component({
  selector: 'app-word-suggestion',
  imports: [WordSuggestionsFormComponent],
  templateUrl: './word-suggestion.page.html',
  styleUrl: './word-suggestion.page.css',
})
export class WordSuggestionPage implements IAlertUtils, OnDestroy {
  private readonly facade: CrudWordSuggestionsUiFacade = inject(CrudWordSuggestionsUiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  registerSuggestion(data: IWordSuggestionData): void {
    this.facade.register(data);
  }
}
