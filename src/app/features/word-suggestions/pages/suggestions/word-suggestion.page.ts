import { Component, inject, OnDestroy, Signal } from '@angular/core';
import { CrudWordSuggestionsUiFacade } from '../../facades/ui/crud/crud-word-suggestions-ui.facade.ts.js';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IAlertState } from '../../../../shared/models/alert-state.interface';
import { WordSuggestionsFormComponent } from '../../components/form/word-suggestions-form/word-suggestions-form.component';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface.js';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-word-suggestion',
  imports: [WordSuggestionsFormComponent, AlertComponent],
  templateUrl: './word-suggestion.page.html',
  styleUrl: './word-suggestion.page.css',
})
export class WordSuggestionPage implements IAlertUtils, OnDestroy {
  private readonly facade: CrudWordSuggestionsUiFacade = inject(CrudWordSuggestionsUiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  alert: Signal<IAlertState | null> = this.alertService.alert;

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
