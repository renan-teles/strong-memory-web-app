import { Component, inject, Signal } from '@angular/core';
import { FilterWordSuggestionsFormComponent } from '../../components/form/filter-word-suggestions-form/filter-word-suggestions-form.component';
import { IFilterWordSuggestionFormData } from '../../models/filter-word-suggestion-form-data.interface';
import { IPaginationState } from '../../../../shared/models/pagination-state.interface';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface';
import { SpinnerBorderComponent } from '../../../../shared/components/spinner-border/spinner-border.component';
import { TitleCasePipe } from '@angular/common';
import { CrudWordSuggestionsUiFacade } from '../../facades/ui/crud/crud-word-suggestions-ui.facade';
import { ConfirmModalService } from '../../../../core/services/modals/confirm/confirm-modal.service';
import { isValidPage } from '../../../../shared/utils/pagination.utils';
import { FormWordSuggestionModalService } from '../../services/modals/form-word-suggestion/form-word-suggestion-modal.service';
import { LoadWordSuggestionsUiFacade } from '../../facades/ui/load-word-suggestions/load-word-suggestions-ui.facade';
import { CrudWordsUiFacade } from '../../../words/facades/ui/crud/crud-words-ui.facade';
import { TranslateDifficultyPipe } from '../../../../shared/pipes/translate-difficulty.pipe';

@Component({
  selector: 'app-list-word-suggestions',
  imports: [
    FilterWordSuggestionsFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    TranslateDifficultyPipe,
  ],
  templateUrl: './list-word-suggestions.page.html',
  styleUrl: './list-word-suggestions.page.css',
})
export class ListWordSuggestionsPage {
  private readonly facade: LoadWordSuggestionsUiFacade = inject(LoadWordSuggestionsUiFacade);
  private readonly crudSuggestionsFacade: CrudWordSuggestionsUiFacade = inject(
    CrudWordSuggestionsUiFacade,
  );
  private readonly crudWordsFacade: CrudWordsUiFacade = inject(CrudWordsUiFacade);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly suggestionsModal: FormWordSuggestionModalService = inject(
    FormWordSuggestionModalService,
  );

  private suggestionsBy: 'all' | 'by-period' = 'all';
  filterData: IFilterWordSuggestionFormData | null = null;

  paginationState: Signal<IPaginationState<IWordSuggestionData>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;
  wordsSuggestions: Signal<IWordSuggestionData[]> = this.facade.wordsSuggestions;
  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;
  loadSuggestionsSuccess: Signal<boolean> = this.facade.success;

  isDeletingSuggestion: Signal<boolean> = this.crudSuggestionsFacade.isDeleting;
  isRegistingWord: Signal<boolean> = this.crudWordsFacade.isRegistering;

  loadSuggestions(page: number = 0) {
    if (this.suggestionsBy === 'all') {
      this.loadAll(page);
      return;
    }

    if (!this.filterData) return;
    this.loadByPeriod(this.filterData, page);
  }

  loadAll(page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.suggestionsBy = 'all';
    this.facade.loadAll(page);
  }

  loadByPeriod(filterData: IFilterWordSuggestionFormData, page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.suggestionsBy = 'by-period';
    this.filterData = filterData;
    this.facade.loadByPeriod(filterData, page);
  }

  deleteSuggestion(suggestionId: number): void {
    this.confirmModal
      .confirm('Deletar Sugestão de Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.crudSuggestionsFacade.delete(suggestionId, this.filterData))
      .catch(() => {});
  }

  registerSuggestionInWords(suggestionId: number): void {
    const suggestion = this.facade.findWordById(suggestionId);
    if (!suggestion) return;

    this.suggestionsModal
      .confirm('Cadastrar Palavra', suggestion)
      .then((data: IWordSuggestionData) => {
        this.crudWordsFacade.register({
          word: data.suggestedWord,
          difficulty: data.suggestedDifficulty,
        });
      })
      .catch(() => {});
  }
}
