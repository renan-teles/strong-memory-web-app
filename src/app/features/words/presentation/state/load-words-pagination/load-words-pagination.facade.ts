import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { WordsApiService } from '../../../data/services/words-api/words-api.service';
import {
  clearPaginationStateSignal,
  createPaginationStateSignal,
  generatePages,
} from '../../../../../shared/utils/pagination.utils';
import { PaginationState } from '../../../../../shared/types/pagination/pagination-state.interface';
import { WordResponse } from '../../../data/dto/response/word-response';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { PaginationResponse } from '../../../../../shared/types/pagination/pagination-response.interface';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import {
  setErrorPaginationState,
  setFinalizePaginationState,
  setLoadingPaginationState,
  setSuccessPaginationState,
} from '../../../../../shared/utils/pagination-state.utils';

@Injectable({
  providedIn: 'root',
})
export class LoadWordsPaginationFacade {
  private readonly api: WordsApiService = inject(WordsApiService);

  private readonly _paginationState: WritableSignal<PaginationState<WordResponse>> =
    createPaginationStateSignal<WordResponse>();

  readonly paginationState: Signal<PaginationState<WordResponse>> =
    this._paginationState.asReadonly();

  readonly pages: Signal<number[]> = computed(() =>
    generatePages(this._paginationState().totalPages),
  );

  readonly words: Signal<WordResponse[]> = computed(() => this._paginationState().content);
  readonly isLoading: Signal<boolean> = computed(() => this._paginationState().isLoading);
  readonly success: Signal<boolean> = computed(() => this._paginationState().success);

  findWordById(wordId: number): WordResponse | undefined {
    return this.words().find((w) => w.id! === wordId);
  }

  loadByDifficulty(data: WordDifficultyResponse, page: number): void {
    clearPaginationStateSignal(this._paginationState);
    setLoadingPaginationState(this._paginationState);

    this.api
      .loadByDifficulty(data, {
        page,
        size: 10,
        sortBy: 'word',
      })
      .pipe(
        tap((response: ApiResponse<PaginationResponse<WordResponse>>) => {
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
