import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AlertService } from '../../../../../core/services/alerts/alert.service';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { WordSuggestionsFacade } from '../../word-suggestions.facade.ts';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudWordSuggestionsUiFacade {
  private readonly facade: WordSuggestionsFacade = inject(WordSuggestionsFacade);
  private readonly alert: AlertService = inject(AlertService);

  private readonly _registerState = signal<IRegisterState>({
    isRegistering: false,
    registerSuccess: false,
  });

  readonly isRegistering: Signal<boolean> = computed(() => {
    return this._registerState().isRegistering;
  });

  readonly registerSuccess: Signal<boolean> = computed(() => {
    return this._registerState().registerSuccess;
  });

  register(data: IWordSuggestionData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      registerSuccess: false,
    }));

    this.facade
      .register(data)
      .pipe(
        tap((response: IApiResponse<IWordSuggestionData>) => {
          this._registerState.update((s) => ({
            ...s,
            registerSuccess: true,
          }));
          this.alert.success(response.message).startTimeoutToClear();
        }),

        catchError((error: HttpErrorResponse) => {
          this._registerState.update((s) => ({
            ...s,
            registerSuccess: false,
          }));
          this.alert.error(error.error.message).startTimeoutToClear();
          return EMPTY;
        }),

        finalize(() => {
          this._registerState.update((s) => ({
            ...s,
            isRegistering: false,
          }));
        }),
      )
      .subscribe();
  }

  resetRegisterState(): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: false,
      registerSuccess: false,
    }));
  }
}
