import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WordSuggestionsApiService } from '../../../data/services/suggestions-api/word-suggestions-api.service';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { WordSuggestionResponse } from '../../../data/dto/response/word-suggestion-response';
import { WordSuggestionRequest } from '../../../data/dto/request/word-suggestion-request';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';

@Injectable({
  providedIn: 'root',
})
export class CrudWordSuggestionsApiFacade {
  private readonly api: WordSuggestionsApiService = inject(WordSuggestionsApiService);
  private readonly alert: AlertService = inject(AlertService);

  private readonly _registerState = signal<RequestState<WordSuggestionResponse | null>>({
    status: 'idle',
    data: null,
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

  readonly isDeleting: Signal<boolean> = computed(() => this._deleteState().status === 'loading');
  readonly deleteSuccess: Signal<boolean> = computed(
    () => this._deleteState().status === 'success',
  );

  register(data: WordSuggestionRequest): void {
    setRequestState(this._registerState, 'loading', null);

    this.api
      .register(data)
      .pipe(
        tap((response: ApiResponse<WordSuggestionResponse>) => {
          setRequestState(this._registerState, 'success', response.data!);
          this.alert.success(response.message);
        }),
        catchError(() => {
          setStatusRequestState(this._registerState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  resetRegisterState(): void {
    setRequestState(this._registerState, 'idle', null);
  }

  delete(suggestionId: number, returnObservable: boolean = false): void | Observable<void> {
    setStatusRequestState(this._deleteState, 'loading');

    const obs: Observable<void> = this.api.delete(suggestionId).pipe(
      tap(() => {
        setStatusRequestState(this._deleteState, 'success');
        this.alert.success('Sucesso ao deletar sugestão de palavra.');
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
