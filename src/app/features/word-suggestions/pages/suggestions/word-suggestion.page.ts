import { Component, inject, OnDestroy, Signal } from '@angular/core';
import { WordSuggestionsUiFacade } from '../../facades/ui/word-suggestions-ui.facade.ts';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { WordSuggestionsFormComponent } from '../../components/form/word-suggestions-form/word-suggestions-form.component';
import { IWordSuggestionFormData } from '../../models/word-suggestion-form-data.interface';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-word-suggestion',
  imports: [WordSuggestionsFormComponent, AlertComponent],
  templateUrl: './word-suggestion.page.html',
  styleUrl: './word-suggestion.page.css',
})
export class WordSuggestionPage implements IAlertUtils, OnDestroy {
  private readonly ui = inject(WordSuggestionsUiFacade);

  private readonly alertService = inject(AlertService);
  alert: Signal<IAlertState | null> = this.alertService.alert;

  ngOnDestroy(): void {
    this.closeAlert();
  }

  closeAlert(): void {
    this.alertService.clear();
  }

  registerSuggestion(data: IWordSuggestionFormData): void {
    this.ui.registerSuggestion(data);
  }
}
