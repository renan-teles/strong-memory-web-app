import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { LoadWordsPaginationFacade } from '../load-words-pagination/load-words-pagination.facade';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { WordsApiService } from '../../../data/services/words-api/words-api.service';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { WordRequest } from '../../../data/dto/request/word-request';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';
import { catchError, EMPTY, tap } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { WordResponse } from '../../../data/dto/response/word-response';
import { UpdateWordRequest } from '../../../data/dto/request/update-word-request';

@Injectable({
  providedIn: 'root',
})
export class CrudWordsFacade {
  private readonly api: WordsApiService = inject(WordsApiService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  private readonly paginationWordsFacade: LoadWordsPaginationFacade =
    inject(LoadWordsPaginationFacade);

  private readonly _registerState = signal<RequestState<WordRequest | null>>({
    status: 'idle',
    data: null,
  });

  private readonly _updateState = signal<RequestState<void>>({
    status: 'idle',
  });

  private readonly _deleteState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly isRegistering: Signal<boolean> = computed(
    () => this._registerState().status === 'loading',
  );
  readonly registerSuccess: Signal<boolean> = computed(
    () => this._registerState().status === 'success',
  );

  readonly isUpdating: Signal<boolean> = computed(() => this._updateState().status === 'loading');
  readonly updateSuccess: Signal<boolean> = computed(
    () => this._updateState().status === 'success',
  );

  readonly isDeleting: Signal<boolean> = computed(() => this._deleteState().status === 'loading');
  readonly deleteSuccess: Signal<boolean> = computed(
    () => this._deleteState().status === 'success',
  );

  register(data: WordRequest): void {
    setRequestState(this._registerState, 'loading', null);

    this.api
      .register(data)
      .pipe(
        tap((response: ApiResponse<WordResponse>) => {
          setRequestState(this._registerState, 'success', response.data!);
          this.alertService.success(response.message);
          this.realoadWords();
        }),
        catchError(() => {
          setStatusRequestState(this._registerState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  update(wordId: number, word: UpdateWordRequest): void {
    setStatusRequestState(this._updateState, 'loading');

    this.api
      .update(wordId, word)
      .pipe(
        tap(() => {
          setStatusRequestState(this._updateState, 'success');
          this.alertService.success('Palavra atualizada com sucesso.');
          this.realoadWords();
        }),
        catchError(() => {
          setStatusRequestState(this._updateState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  delete(wordId: number): void {
    setStatusRequestState(this._deleteState, 'loading');

    this.api
      .delete(wordId)
      .pipe(
        tap(() => {
          setStatusRequestState(this._deleteState, 'success');
          this.alertService.success('Palavra deletada com sucesso.');
          this.realoadWords();
        }),
        catchError(() => {
          setStatusRequestState(this._deleteState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  private realoadWords(): void {
    this.paginationWordsFacade.loadByDifficulty(this.difficultyService.currentDifficulty!, 0);
  }
}
