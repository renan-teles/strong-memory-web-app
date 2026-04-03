import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { WordSuggestionsFacade } from '../../word-suggestions.facade.ts';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IFilterWordSuggestionFormData } from '../../../models/filter-word-suggestion-form-data.interface';
import { LoadWordSuggestionsUiFacade } from '../load-word-suggestions/load-word-suggestions-ui.facade';
import { IDeleteState } from '../../../../../shared/models/delete-state.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudWordSuggestionsUiFacade {
  private readonly facade: WordSuggestionsFacade = inject(WordSuggestionsFacade);
  private readonly alert: AlertService = inject(AlertService);
  private readonly loadWordSuggestions: LoadWordSuggestionsUiFacade = inject(
    LoadWordSuggestionsUiFacade,
  );

  private readonly _registerState = signal<IRegisterState>({
    isRegistering: false,
    success: false,
  });

  private readonly _deleteState = signal<IDeleteState>({
    isDeleting: false,
    success: false,
  });

  readonly isRegistering: Signal<boolean> = computed(() => this._registerState().isRegistering);
  readonly registerSuccess: Signal<boolean> = computed(() => this._registerState().success);

  readonly isDeleting: Signal<boolean> = computed(() => this._deleteState().isDeleting);
  readonly deleteSuccess: Signal<boolean> = computed(() => this._deleteState().success);

  register(data: IWordSuggestionData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      success: false,
    }));

    this.facade
      .register(data)
      .pipe(
        tap((response: IApiResponse<IWordSuggestionData>) => {
          this._registerState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alert.success(response.message);
        }),

        catchError(() => {
          this._registerState.update((s) => ({
            ...s,
            success: false,
          }));
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
      success: false,
    }));
  }

  delete(suggestionId: number, filter: IFilterWordSuggestionFormData | null): void {
    this._deleteState.update((s) => ({
      ...s,
      isDeleting: true,
      success: false,
    }));

    this.facade
      .delete(suggestionId)
      .pipe(
        tap(() => {
          this._deleteState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alert.success('Sucesso ao deletar sugestão de palavra.');
          this.realoadSuggestions(filter);
        }),

        catchError(() => {
          this._deleteState.update((s) => ({
            ...s,
            success: false,
          }));

          return EMPTY;
        }),

        finalize(() => {
          this._deleteState.update((s) => ({
            ...s,
            isDeleting: false,
          }));
        }),
      )
      .subscribe();
  }

  private realoadSuggestions(filter: IFilterWordSuggestionFormData | null = null) {
    if (!filter) {
      this.loadWordSuggestions.loadAll();
      return;
    }
    this.loadWordSuggestions.loadByPeriod(filter, 0);
  }
}
