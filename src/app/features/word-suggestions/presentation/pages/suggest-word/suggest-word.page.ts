import { Component, inject, OnDestroy } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { WordSuggestionRequest } from '../../../data/dto/request/word-suggestion-request';
import { AlertUtils } from '../../../../../shared/types/ui/alert/alert-utils.interface';
import { CrudWordSuggestionsApiFacade } from '../../state/api/crud-word-suggestions-api.facade';
import { WordSuggestionsFormComponent } from '../../components/form/word-suggestions/word-suggestions-form/word-suggestions-form.component';

@Component({
  selector: 'app-suggest-word',
  imports: [WordSuggestionsFormComponent],
  templateUrl: './suggest-word.page.html',
  styleUrl: './suggest-word.page.css',
})
export class SuggestWordsPage implements AlertUtils, OnDestroy {
  private readonly facadeApi: CrudWordSuggestionsApiFacade = inject(CrudWordSuggestionsApiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  registerSuggestion(data: WordSuggestionRequest): void {
    this.facadeApi.register(data);
  }
}
