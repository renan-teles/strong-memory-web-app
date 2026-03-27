import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { WordSuggestionsFacade } from '../../word-suggestions.facade.ts';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IFilterWordSuggestionFormData } from '../../../models/filter-word-suggestion-form-data.interface';
import { LoadWordSuggestionsFacade } from '../load-word-suggestions/load-word-suggestions-ui.facade';
import { ConfirmModalService } from '../../../../../core/services/modals/confirm/confirm-modal.service';
import { FormWordSuggestionModalService } from '../../../services/modals/form-word-suggestion/form-word-suggestion-modal.service';

@Injectable({
  providedIn: 'root',
})
export class CrudWordSuggestionsUiFacade {
  private readonly facade: WordSuggestionsFacade = inject(WordSuggestionsFacade);
  private readonly alert: AlertService = inject(AlertService);
  private readonly loadWordSuggestions: LoadWordSuggestionsFacade =
    inject(LoadWordSuggestionsFacade);
  private readonly confirmService = inject(ConfirmModalService);
  private readonly formWordSuggestionModalService: FormWordSuggestionModalService = inject(
    FormWordSuggestionModalService,
  );

  private readonly _registerState = signal<IRegisterState>({
    isRegistering: false,
    success: false,
  });

  readonly isRegistering: Signal<boolean> = computed(() => {
    return this._registerState().isRegistering;
  });

  readonly registerSuccess: Signal<boolean> = computed(() => {
    return this._registerState().success;
  });

  register(
    data: IWordSuggestionData | null = null,
    filter: IFilterWordSuggestionFormData | null = null,
    suggestioId: number | null = null,
  ): void {
    if ((!filter || !suggestioId) && data) {
      this.registerPrivate(data, null);
      return;
    }

    const suggestion: IWordSuggestionData | null | undefined = this.loadWordSuggestions
      .wordsSuggestions()
      .find((s) => s.id! === suggestioId);

    if (!suggestion) return;

    this.formWordSuggestionModalService
      .confirm('Cadastrar Palavra', suggestion)
      .then((data: IWordSuggestionData) => {
        // this.registerPrivate(data, filter);
      })
      .catch(() => {});
  }

  private registerPrivate(
    data: IWordSuggestionData,
    filter: IFilterWordSuggestionFormData | null = null,
  ): void {
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
          if (!filter) return;

          this.realoadSuggestions(filter);
        }),

        catchError((error: HttpErrorResponse) => {
          this._registerState.update((s) => ({
            ...s,
            success: false,
          }));
          this.alert.error(error.error.message);
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

  delete(suggestionId: number, filter: IFilterWordSuggestionFormData | null = null): void {
    this.confirmService
      .confirm('Deletar Sugestão de Palavra', 'Tem certeza que deseja deletar?', 'btn-danger')
      .then(() => {
        this.facade
          .delete(suggestionId)
          .pipe(
            tap(() => {
              this.alert.success('Sucesso ao deletar sugestão de palavra.');
              this.realoadSuggestions(filter);
            }),
            catchError(() => {
              this.alert.error('Erro ao deletar sugestão de palavra.');
              return EMPTY;
            }),
          )
          .subscribe();
      })
      .catch(() => {});
  }

  private realoadSuggestions(filter: IFilterWordSuggestionFormData | null = null) {
    if (!filter) {
      this.loadWordSuggestions.loadAll();
      return;
    }
    this.loadWordSuggestions.loadByPeriod(filter, 0);
  }
}
