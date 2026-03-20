import { inject, Injectable, signal } from '@angular/core';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IWordSuggestionFormData } from '../../models/word-suggestion-form-data.interface';
import { WordSuggestionsFacade } from '../word-suggestions.facade.ts';
import { IRegisterState } from '../../../../shared/models/register-state.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsUiFacade {
  private readonly facade = inject(WordSuggestionsFacade);
  private readonly alert = inject(AlertService);

  readonly registerState = signal<IRegisterState>({
    isRegistering: false,
    registerSuccess: false,
  });

  registerSuggestion(data: IWordSuggestionFormData): void {
    this.registerState.update((s) => ({
      ...s,
      isRegistering: true,
      registerSuccess: false,
    }));

    this.facade
      .registerSuggestion(data)
      .pipe(
        tap((response: IApiResponse<IWordSuggestionFormData>) => {
          this.registerState.update((s) => ({
            ...s,
            registerSuccess: true,
          }));
          this.alert.success(response.message);
          this.alert.timeoutToClear();
        }),

        catchError((error: HttpErrorResponse) => {
          this.registerState.update((s) => ({
            ...s,
            registerSuccess: false,
          }));
          this.setErrorAlert<IWordSuggestionFormData>(error.error);
          return EMPTY;
        }),

        finalize(() => {
          this.registerState.update((s) => ({
            ...s,
            isRegistering: false,
          }));
        }),
      )
      .subscribe();
  }

  resetRegisterState(): void {
    this.registerState.update((s) => ({
      ...s,
      isRegistering: false,
      registerSuccess: false,
    }));
  }

  private setErrorAlert<T>(errorBody: IApiResponse<T>): void {
    this.alert.error(errorBody.message);
    this.alert.timeoutToClear();
  }
}
