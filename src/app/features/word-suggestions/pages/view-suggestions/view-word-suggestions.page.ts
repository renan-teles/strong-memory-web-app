import { Component, inject, Signal } from '@angular/core';
import { FilterWordSuggestionsFormComponent } from '../../components/form/filter-word-suggestions-form/filter-word-suggestions-form.component';
import { IFilterWordSuggestionFormData } from '../../models/filter-word-suggestion-form-data.interface';
import { IPaginationState } from '../../../../shared/models/pagination-state.interface';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface';
import { LoadWordSuggestionsFacade } from '../../facades/ui/load-word-suggestions/load-word-suggestions-ui.facade';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TitleCasePipe } from '@angular/common';
import { CrudWordSuggestionsUiFacade } from '../../facades/ui/crud/crud-word-suggestions-ui.facade';

@Component({
  selector: 'app-view-word-suggestions',
  imports: [FilterWordSuggestionsFormComponent, SpinnerBorderComponent, TitleCasePipe],
  templateUrl: './view-word-suggestions.page.html',
  styleUrl: './view-word-suggestions.page.css',
})
export class ViewWordSuggestionsPage {
  private readonly facade: LoadWordSuggestionsFacade = inject(LoadWordSuggestionsFacade);
  private readonly crudFacade: CrudWordSuggestionsUiFacade = inject(CrudWordSuggestionsUiFacade);

  private role: 'all' | 'by-period' = 'all';

  submittedData: IFilterWordSuggestionFormData | null = null;

  paginationState: Signal<IPaginationState<IWordSuggestionData>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;
  wordsSuggestions: Signal<IWordSuggestionData[]> = this.facade.wordsSuggestions;
  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;
  loadSuggestionsSuccess: Signal<boolean> = this.facade.success;

  loadSuggestions(page: number = 0) {
    if (this.role === 'all') {
      this.loadAll(page);
      return;
    }

    if (!this.submittedData) return;
    this.loadByPeriod(this.submittedData, page);
  }

  loadAll(page: number = 0): void {
    if (page !== 0 && (page < 0 || page >= this.paginationState().totalPages)) return;
    this.role = 'all';
    this.facade.loadAll(page);
  }

  loadByPeriod(submittedData: IFilterWordSuggestionFormData, page: number = 0): void {
    this.role = 'by-period';
    this.submittedData = submittedData;
    this.facade.loadByPeriod(submittedData, page);
  }

  deleteSuggestion(suggestedId: number): void {
    this.crudFacade.delete(suggestedId, this.submittedData);
  }

  registerSuggestion(suggestedId: number) {
    this.crudFacade.register(null, this.submittedData, suggestedId);
  }
}
