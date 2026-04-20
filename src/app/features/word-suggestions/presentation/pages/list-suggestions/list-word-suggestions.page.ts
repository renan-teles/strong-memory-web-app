import { TitleCasePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { isValidPage } from '../../../../../shared/utils/pagination.utils';
import { WordSuggestionRequest } from '../../../data/dto/request/word-suggestion-request';
import { WordSuggestionResponse } from '../../../data/dto/response/word-suggestion-response';
import { FilterWordSuggestionsFormComponent } from '../../components/form/filter-word-suggestions-form/filter-word-suggestions-form.component';
import { FormWordSuggestionModalService } from '../../services/modals/form-word-suggestion/form-word-suggestion-modal.service';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { SpinnerBorderComponent } from '../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { TranslateDifficultyPipe } from '../../../../../shared/ui/pipes/translate-difficulty.pipe';
import { ConfirmModalService } from '../../../../../shared/services/modals/confirm/confirm-modal.service';
import { LoadWordSuggestionsFacade } from '../../state/load-word-suggestions/load-word-suggestions.facade';
import { CrudWordSuggestionsFacade } from '../../state/crud/crud-word-suggestions.facade';
import { CrudWordsFacade } from '../../../../words/presentation/state/crud/crud-words.facade';
import { FilterWordSuggestionRequest } from '../../../data/dto/request/filter-word-suggestion-request';
import { NavPaginationUtils } from '../../../../../shared/types/ui/nav-pagination/nav-pagination-utils.interface';
import { NavPaginationOutput } from '../../../../../shared/ui/components/nav-pagination/nav-pagination-output.type';
import { NavPaginationComponent } from '../../../../../shared/ui/components/nav-pagination/nav-pagination.component';

@Component({
  selector: 'app-list-word-suggestions',
  imports: [
    FilterWordSuggestionsFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    TranslateDifficultyPipe,
    NavPaginationComponent,
  ],
  templateUrl: './list-word-suggestions.page.html',
  styleUrl: './list-word-suggestions.page.css',
})
export class ListWordSuggestionsPage implements NavPaginationUtils {
  private readonly facade = inject(LoadWordSuggestionsFacade);
  private readonly crudSuggestionsFacade = inject(CrudWordSuggestionsFacade);
  private readonly crudWordsFacade: CrudWordsFacade = inject(CrudWordsFacade);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly suggestionsModal: FormWordSuggestionModalService = inject(
    FormWordSuggestionModalService,
  );

  private suggestionsBy: 'all' | 'by-period' = 'all';
  filterData: FilterWordSuggestionRequest | null = null;

  paginationState: Signal<PaginationState<WordSuggestionResponse>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;

  wordsSuggestions: Signal<WordSuggestionResponse[]> = this.facade.wordsSuggestions;
  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;
  loadSuggestionsSuccess: Signal<boolean> = this.facade.success;

  isDeletingSuggestion: Signal<boolean> = this.crudSuggestionsFacade.isDeleting;
  isRegistingWord: Signal<boolean> = this.crudWordsFacade.isRegistering;

  registerSuggestionInWords(suggestionId: number): void {
    const suggestion = this.facade.findWordById(suggestionId);
    if (!suggestion) return;

    this.suggestionsModal
      .confirm('Cadastrar Palavra', suggestion)
      .then((data: WordSuggestionRequest) => {
        this.crudWordsFacade.register({
          word: data.suggestedWord,
          difficulty: data.suggestedDifficulty,
        });
      })
      .catch(() => {});
  }

  deleteSuggestion(suggestionId: number): void {
    this.confirmModal
      .confirm('Deletar Sugestão de Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.crudSuggestionsFacade.delete(suggestionId, this.filterData))
      .catch(() => {});
  }

  loadSuggestions(page: number = 0): void {
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

  loadByPeriod(filterData: FilterWordSuggestionRequest, page: number = 0): void {
    if (!isValidPage(page, this.paginationState().totalPages)) return;

    this.suggestionsBy = 'by-period';
    this.filterData = filterData;
    this.facade.loadByPeriod(filterData, page);
  }

  onPagination(paginationOutput: NavPaginationOutput): void {
    this.loadSuggestions(paginationOutput.page);
  }
}
