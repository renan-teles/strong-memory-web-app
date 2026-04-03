import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { WordSuggestionsFacade } from '../../word-suggestions.facade.ts.js';
import { IPaginationState } from '../../../../../shared/models/pagination-state.interface.js';
import {
  clearPaginationStateSignal,
  createPaginationStateSignal,
  generatePages,
} from '../../../../../shared/utils/pagination.utils.js';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface.js';
import { IApiResponse } from '../../../../../shared/models/api-response.interface.js';
import { IPaginationResponse } from '../../../../../shared/models/pagination-response.interface.js';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IFilterWordSuggestionFormData } from '../../../models/filter-word-suggestion-form-data.interface.js';

@Injectable({
  providedIn: 'root',
})
export class LoadWordSuggestionsUiFacade {
  private readonly facade: WordSuggestionsFacade = inject(WordSuggestionsFacade);

  private readonly _paginationState: WritableSignal<IPaginationState<IWordSuggestionData>> =
    createPaginationStateSignal<IWordSuggestionData>();

  paginationState: Signal<IPaginationState<IWordSuggestionData>> =
    this._paginationState.asReadonly();

  readonly pages: Signal<number[]> = computed(() =>
    generatePages(this._paginationState().totalPages),
  );
  readonly wordsSuggestions: Signal<IWordSuggestionData[]> = computed(
    () => this._paginationState().content,
  );
  readonly isLoading: Signal<boolean> = computed(() => this._paginationState().isLoading);
  readonly success: Signal<boolean> = computed(() => this._paginationState().success);

  findWordById(suggestionId: number): IWordSuggestionData | undefined {
    return this.wordsSuggestions().find((s) => s.id! === suggestionId);
  }

  loadAll(page: number = 0): void {
    clearPaginationStateSignal(this._paginationState, true);

    this.facade
      .loadAll(page)
      .pipe(
        tap((response: IApiResponse<IPaginationResponse<IWordSuggestionData>>) => {
          this._paginationState.update((s) => ({
            ...s,
            ...response.data!,
            success: true,
          }));
        }),
        catchError(() => {
          this._paginationState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._paginationState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }

  loadByPeriod(filter: IFilterWordSuggestionFormData, page: number = 0): void {
    clearPaginationStateSignal(this._paginationState, true);

    this.facade
      .loadByPeriod(filter, page)
      .pipe(
        tap((response: IApiResponse<IPaginationResponse<IWordSuggestionData>>) => {
          this._paginationState.update((s) => ({
            ...s,
            ...response.data!,
            success: true,
          }));
        }),
        catchError(() => {
          this._paginationState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._paginationState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }
}
