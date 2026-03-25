import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { WordsFacade } from '../../words.facade';
import { IPaginationState } from '../../../../../shared/models/pagination-state.interface';
import { IWordData } from '../../../models/word-data.interface';
import {
  clearPaginationStateSignal,
  createPaginationStateSignal,
  generatePages,
} from '../../../../../shared/utils/pagination.utils';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IPaginationResponse } from '../../../../../shared/models/pagination-response.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IWordDifficultyFormData } from '../../../../../shared/models/word-difficulty-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class LoadWordsPaginationUiFacade {
  private readonly facade: WordsFacade = inject(WordsFacade);

  private readonly _paginationState: WritableSignal<IPaginationState<IWordData>> =
    createPaginationStateSignal<IWordData>();

  paginationState: Signal<IPaginationState<IWordData>> = this._paginationState.asReadonly();

  readonly pages: Signal<number[]> = computed(() => {
    return generatePages(this._paginationState().totalPages);
  });

  readonly words: Signal<IWordData[]> = computed(() => {
    return this._paginationState().content;
  });

  readonly isLoading: Signal<boolean> = computed(() => {
    return this._paginationState().isLoading;
  });

  readonly success: Signal<boolean> = computed(() => {
    return this._paginationState().success;
  });

  loadByDifficulty(data: IWordDifficultyFormData, page: number): void {
    clearPaginationStateSignal(this._paginationState, true);

    this.facade
      .loadByDifficulty(data, page)
      .pipe(
        tap((response: IApiResponse<IPaginationResponse<IWordData>>) => {
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
