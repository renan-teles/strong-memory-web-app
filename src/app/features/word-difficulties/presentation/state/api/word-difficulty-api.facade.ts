import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WordDifficultyApiService } from '../../../data/services/word-difficulty-api/word-difficulty-api.service';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { WordDifficultyResponse } from '../../../data/dto/response/word-difficulty-response';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyApiFacade {
  private readonly api: WordDifficultyApiService = inject(WordDifficultyApiService);

  private readonly _loadState = signal<RequestState<WordDifficultyResponse[]>>({
    status: 'idle',
    data: [],
  });

  readonly difficulties: Signal<WordDifficultyResponse[]> = computed(() => this._loadState().data!);
  readonly isLoading: Signal<boolean> = computed(() => this._loadState().status === 'loading');
  readonly loadingSuccess: Signal<boolean> = computed(() => this._loadState().status === 'success');

  loadAll(): Observable<ApiResponse<WordDifficultyResponse[]>> {
    setRequestState(this._loadState, 'loading', []);

    return this.api.loadAll().pipe(
      tap((response: ApiResponse<WordDifficultyResponse[]>) => {
        setRequestState(this._loadState, 'success', response.data!);
      }),
      catchError(() => {
        setStatusRequestState(this._loadState, 'error');
        return EMPTY;
      }),
    );
  }
}
