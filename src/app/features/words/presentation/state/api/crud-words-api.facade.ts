import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { WordsApiService } from '../../../data/services/words-api/words-api.service';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { WordRequest } from '../../../data/dto/request/word-request';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { WordResponse } from '../../../data/dto/response/word-response';
import { UpdateWordRequest } from '../../../data/dto/request/update-word-request';

@Injectable({
  providedIn: 'root',
})
export class CrudWordsApiFacade {
  private readonly api: WordsApiService = inject(WordsApiService);
  private readonly alertService: AlertService = inject(AlertService);

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

  register(
    data: WordRequest,
    suggestionOrigin: boolean = false,
    returnObservable: boolean = false,
  ): void | Observable<ApiResponse<WordResponse>> {
    setRequestState(this._registerState, 'loading', null);

    const obs: Observable<ApiResponse<WordResponse>> = this.api
      .register(data, suggestionOrigin)
      .pipe(
        tap((response: ApiResponse<WordResponse>) => {
          setRequestState(this._registerState, 'success', response.data!);
          this.alertService.success(response.message);
        }),
        catchError(() => {
          setStatusRequestState(this._registerState, 'error');
          return EMPTY;
        }),
      );

    if (returnObservable) {
      return obs;
    }
    obs.subscribe();
  }

  update(
    wordId: number,
    word: UpdateWordRequest,
    returnObservable: boolean = false,
  ): void | Observable<void> {
    setStatusRequestState(this._updateState, 'loading');

    const obs: Observable<void> = this.api.update(wordId, word).pipe(
      tap(() => {
        setStatusRequestState(this._updateState, 'success');
        this.alertService.success('Palavra atualizada com sucesso.');
      }),
      catchError(() => {
        setStatusRequestState(this._updateState, 'error');
        return EMPTY;
      }),
    );

    if (returnObservable) {
      return obs;
    }
    obs.subscribe();
  }

  delete(wordId: number, returnObservable: boolean = false): void | Observable<void> {
    setStatusRequestState(this._deleteState, 'loading');

    const obs: Observable<void> = this.api.delete(wordId).pipe(
      tap(() => {
        setStatusRequestState(this._deleteState, 'success');
        this.alertService.success('Palavra deletada com sucesso.');
      }),
      catchError(() => {
        setStatusRequestState(this._deleteState, 'error');
        return EMPTY;
      }),
    );

    if (returnObservable) {
      return obs;
    }
    obs.subscribe();
  }
}
