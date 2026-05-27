import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { isValidPage } from '../../../../../shared/utils/pagination/pagination.utils';
import { WordSuggestionRequest } from '../../../data/dto/request/word-suggestion-request';
import { WordSuggestionResponse } from '../../../data/dto/response/word-suggestion-response';
import { FilterWordSuggestionsFormComponent } from '../../components/form/filter-word-suggestions-form/filter-word-suggestions-form.component';
import { FormWordSuggestionModalService } from '../../services/modals/form-word-suggestion/form-word-suggestion-modal.service';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { SpinnerBorderComponent } from '../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { ConfirmModalService } from '../../../../../shared/services/modals/confirm/confirm-modal.service';
import { LoadWordSuggestionsApiFacade } from '../../state/api/load-word-suggestions-api.facade';
import { CrudWordSuggestionsApiFacade } from '../../state/api/crud-word-suggestions-api.facade';
import { CrudWordsApiFacade } from '../../../../words/presentation/state/api/crud-words-api.facade';
import { FilterWordSuggestionRequest } from '../../../data/dto/request/filter-word-suggestion-request';
import { NavPaginationUtils } from '../../../../../shared/types/ui/nav-pagination/nav-pagination-utils.interface';
import { NavPaginationOutput } from '../../../../../shared/ui/components/nav-pagination/nav-pagination-output.type';
import { NavPaginationComponent } from '../../../../../shared/ui/components/nav-pagination/nav-pagination.component';
import { isObservable, tap } from 'rxjs';

@Component({
  selector: 'app-list-word-suggestions',
  imports: [
    FilterWordSuggestionsFormComponent,
    SpinnerBorderComponent,
    TitleCasePipe,
    NavPaginationComponent,
    DatePipe,
  ],
  templateUrl: './list-word-suggestions.page.html',
  styleUrl: './list-word-suggestions.page.css',
})
export class ListWordSuggestionsPage implements NavPaginationUtils {
  private readonly facade = inject(LoadWordSuggestionsApiFacade);
  private readonly crudSuggestionsApiFacade = inject(CrudWordSuggestionsApiFacade);
  private readonly crudWordsApiFacade: CrudWordsApiFacade = inject(CrudWordsApiFacade);
  private readonly confirmModal: ConfirmModalService = inject(ConfirmModalService);
  private readonly suggestionsModal: FormWordSuggestionModalService = inject(
    FormWordSuggestionModalService,
  );

  filterData: FilterWordSuggestionRequest | null = null;

  paginationState: Signal<PaginationState<WordSuggestionResponse>> = this.facade.paginationState;
  pages: Signal<number[]> = this.facade.pages;

  wordsSuggestions: Signal<WordSuggestionResponse[]> = this.facade.wordsSuggestions;
  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;
  loadSuggestionsSuccess: Signal<boolean> = this.facade.success;

  isDeletingSuggestion: Signal<boolean> = this.crudSuggestionsApiFacade.isDeleting;
  isRegistingWord: Signal<boolean> = this.crudWordsApiFacade.isRegistering;

  onRegisterSuggestionInWords(suggestionId: number): void {
    const suggestion = this.facade.findWordById(suggestionId);
    if (!suggestion) return;

    this.suggestionsModal
      .confirm('Cadastrar Palavra', suggestion)
      .then((data: WordSuggestionRequest) => this.registerWord(data))
      .catch(() => {});
  }

  onDeleteSuggestion(suggestionId: number): void {
    this.confirmModal
      .confirm('Deletar Sugestão de Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => this.deleteSuggestion(suggestionId))
      .catch(() => {});
  }

  onLoadByPeriod(filterData: FilterWordSuggestionRequest, page: number = 0): void {
    this.filterData = filterData;
    this.loadByPeriod(page);
  }

  onPagination(paginationOutput: NavPaginationOutput): void {
    this.loadByPeriod(paginationOutput.page);
  }

  private loadByPeriod(page: number = 0): void {
    if (!this.filterData || !isValidPage(page, this.paginationState().totalPages)) return;
    this.facade.loadByPeriod(this.filterData, page);
  }

  private registerWord(data: WordSuggestionRequest): void {
    const obs = this.crudWordsApiFacade.register(
      {
        word: data.word,
        difficulty: data.difficulty,
      },
      true,
      true,
    );

    this.reloadData(obs);
  }

  private deleteSuggestion(suggestionId: number): void {
    this.reloadData(this.crudSuggestionsApiFacade.delete(suggestionId, true));
  }

  private reloadData(observable: any): void {
    if (isObservable(observable)) {
      observable.pipe(tap(() => this.loadByPeriod())).subscribe();
    }
  }
}
