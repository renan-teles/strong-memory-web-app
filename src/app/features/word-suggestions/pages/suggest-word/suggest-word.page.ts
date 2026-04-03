import { Component, inject, OnDestroy } from '@angular/core';
import { CrudWordSuggestionsUiFacade } from '../../facades/ui/crud/crud-word-suggestions-ui.facade.js';
import { AlertService } from '../../../../core/services/alert/alert.service.js';
import { WordSuggestionsFormComponent } from '../../components/form/word-suggestions-form/word-suggestions-form.component.js';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface.js';

@Component({
  selector: 'app-suggest-word',
  imports: [WordSuggestionsFormComponent],
  templateUrl: './suggest-word.page.html',
  styleUrl: './suggest-word.page.css',
})
export class SuggestWordsPage implements IAlertUtils, OnDestroy {
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
