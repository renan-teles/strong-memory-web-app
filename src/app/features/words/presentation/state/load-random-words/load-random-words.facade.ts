import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { WordsApiService } from '../../../data/services/words-api/words-api.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { WordResponse } from '../../../data/dto/response/word-response';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';

@Injectable({
  providedIn: 'root',
})
export class LoadRandomWordsFacade {
  private readonly api: WordsApiService = inject(WordsApiService);

  private readonly _loadState = signal<RequestState<WordResponse[]>>({
    status: 'idle',
    data: [],
  });

  readonly randomWords: Signal<WordResponse[]> = computed(() => this._loadState().data!);
  readonly isLoading: Signal<boolean> = computed(() => this._loadState().status === 'loading');
  readonly success: Signal<boolean> = computed(() => this._loadState().status === 'success');

  loadRandom(data: WordDifficultyResponse): void {
    setRequestState(this._loadState, 'loading', []);

    this.api
      .loadRandomWords(data)
      .pipe(
        tap((response: ApiResponse<WordResponse[]>) => {
          setRequestState(this._loadState, 'success', response.data!);
        }),
        catchError(() => {
          this._loadState.update((s) => ({
            ...s,
            success: false,
          }));
          setStatusRequestState(this._loadState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
