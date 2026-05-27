import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { WordSuggestionsApiService } from '../../../data/services/suggestions-api/word-suggestions-api.service';
import {
  clearPaginationStateSignal,
  createPaginationStateSignal,
  generatePages,
} from '../../../../../shared/utils/pagination/pagination.utils';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { WordSuggestionResponse } from '../../../data/dto/response/word-suggestion-response';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { PaginationResponse } from '../../../../../shared/types/pagination/pagination-response.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { FilterWordSuggestionRequest } from '../../../data/dto/request/filter-word-suggestion-request';
import {
  setErrorPaginationState,
  setFinalizePaginationState,
  setLoadingPaginationState,
  setSuccessPaginationState,
} from '../../../../../shared/utils/pagination/pagination-state.utils';

@Injectable({
  providedIn: 'root',
})
export class LoadWordSuggestionsApiFacade {
  private readonly api: WordSuggestionsApiService = inject(WordSuggestionsApiService);

  private readonly _paginationState: WritableSignal<PaginationState<WordSuggestionResponse>> =
    createPaginationStateSignal<WordSuggestionResponse>();

  paginationState: Signal<PaginationState<WordSuggestionResponse>> =
    this._paginationState.asReadonly();

  readonly pages: Signal<number[]> = computed(() =>
    generatePages(this._paginationState().totalPages),
  );

  readonly wordsSuggestions: Signal<WordSuggestionResponse[]> = computed(
    () => this._paginationState().content,
  );

  readonly isLoading: Signal<boolean> = computed(() => this._paginationState().isLoading);
  readonly success: Signal<boolean> = computed(() => this._paginationState().success);

  findWordById(suggestionId: number): WordSuggestionResponse | undefined {
    return this.wordsSuggestions().find((s) => s.id! === suggestionId);
  }

  loadByPeriod(filter: FilterWordSuggestionRequest, page: number = 0): void {
    clearPaginationStateSignal(this._paginationState);
    setLoadingPaginationState(this._paginationState);

    this.api
      .loadByPeriod(filter, {
        page,
        size: 15,
        sortBy: 'word',
      })
      .pipe(
        tap((response: ApiResponse<PaginationResponse<WordSuggestionResponse>>) => {
          setSuccessPaginationState(this._paginationState, response);
        }),
        catchError(() => {
          setErrorPaginationState(this._paginationState);
          return EMPTY;
        }),
        finalize(() => {
          setFinalizePaginationState(this._paginationState);
        }),
      )
      .subscribe();
  }
}
