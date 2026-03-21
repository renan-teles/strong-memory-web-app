import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { WordsFacade } from '../../words.facade';
import { IPaginationState } from '../../../../../shared/models/pagination-state.interface';
import { IWordData } from '../../../models/word-data.interface';
import {
  clearPaginationStateSignal,
  createPaginationStateSignal,
  generatePages,
} from '../../../../../shared/utils/pagination.utils';
import { IWordDifficultyData } from '../../../models/word-difficulty-data.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IPaginationResponse } from '../../../../../shared/models/pagination-response.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FindWordsPaginationUiFacade {
  private readonly facade: WordsFacade = inject(WordsFacade);

  private readonly _paginationState: WritableSignal<IPaginationState<IWordData>> =
    createPaginationStateSignal<IWordData>();

  readonly pages: Signal<number[]> = computed(() => {
    return generatePages(this._paginationState().totalPages);
  });

  readonly words: Signal<IWordData[]> = computed(() => {
    return this._paginationState().content;
  });

  readonly isFinding: Signal<boolean> = computed(() => {
    return this._paginationState().isFinding;
  });

  readonly findSuccess: Signal<boolean> = computed(() => {
    return this._paginationState().findSuccess;
  });

  paginationState: Signal<IPaginationState<IWordData>> = this._paginationState.asReadonly();

  findByDifficulty(data: IWordDifficultyData, page: number): void {
    clearPaginationStateSignal(this._paginationState, true);

    this.facade
      .findByDifficulty(data, page)
      .pipe(
        tap((response: IApiResponse<IPaginationResponse<IWordData>>) => {
          this._paginationState.update((s) => ({
            ...s,
            ...response.data!,
            isFinding: false,
            findSuccess: true,
          }));
        }),

        catchError(() => {
          this._paginationState.update((s) => ({
            ...s,
            findSuccess: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._paginationState.update((s) => ({
            ...s,
            isFinding: false,
          }));
        }),
      )
      .subscribe();
  }
}
