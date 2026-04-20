import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WordSuggestionsApiService } from '../../../data/services/suggestions-api/word-suggestions-api.service';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { WordSuggestionResponse } from '../../../data/dto/response/word-suggestion-response';
import { WordSuggestionRequest } from '../../../data/dto/request/word-suggestion-request';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';
import { LoadWordSuggestionsFacade } from '../load-word-suggestions/load-word-suggestions.facade';
import { FilterWordSuggestionRequest } from '../../../data/dto/request/filter-word-suggestion-request';

@Injectable({
  providedIn: 'root',
})
export class CrudWordSuggestionsFacade {
  private readonly api: WordSuggestionsApiService = inject(WordSuggestionsApiService);
  private readonly alert: AlertService = inject(AlertService);

  private readonly loadWordSuggestions: LoadWordSuggestionsFacade =
    inject(LoadWordSuggestionsFacade);

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

  delete(suggestionId: number, filter: FilterWordSuggestionRequest | null): void {
    setStatusRequestState(this._deleteState, 'loading');

    this.api
      .delete(suggestionId)
      .pipe(
        tap(() => {
          setStatusRequestState(this._deleteState, 'success');
          this.alert.success('Sucesso ao deletar sugestão de palavra.');
          this.realoadSuggestions(filter);
        }),
        catchError(() => {
          setStatusRequestState(this._deleteState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  private realoadSuggestions(filter: FilterWordSuggestionRequest | null = null) {
    if (!filter) {
      this.loadWordSuggestions.loadAll();
      return;
    }
    this.loadWordSuggestions.loadByPeriod(filter, 0);
  }
}
