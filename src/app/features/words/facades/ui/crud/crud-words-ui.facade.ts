import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WordsFacade } from '../../words.facade';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { AlertService } from '../../../../../core/services/alert/alert.service';
import { LoadWordsPaginationUiFacade } from '../load-words-pagination/load-words-pagination-ui.facade';
import { WordDifficultyService } from '../../../../../core/services/word-difficulty/word-difficulty.service';
import { IWordData } from '../../../models/word-data.interface';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IRegisterState } from '../../../../../shared/models/register-state.interface';
import { IUpdateState } from '../../../../../shared/models/update-state.interface';
import { IDeleteState } from '../../../../../shared/models/delete-state.interface';
import { IUpdateWordData } from '../../../models/update-word-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudWordsUiFacade {
  private readonly facade: WordsFacade = inject(WordsFacade);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly paginationWordsFacade: LoadWordsPaginationUiFacade = inject(
    LoadWordsPaginationUiFacade,
  );
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  private readonly _registerState = signal<IRegisterState>({
    isRegistering: false,
    success: false,
  });

  private readonly _updateState = signal<IUpdateState>({
    isUpdating: false,
    success: false,
  });

  private readonly _deleteState = signal<IDeleteState>({
    isDeleting: false,
    success: false,
  });

  readonly isRegistering: Signal<boolean> = computed(() => this._registerState().isRegistering);
  readonly registerSuccess: Signal<boolean> = computed(() => this._registerState().success);

  readonly isUpdating: Signal<boolean> = computed(() => this._updateState().isUpdating);
  readonly updateSuccess: Signal<boolean> = computed(() => this._updateState().success);

  readonly isDeleting: Signal<boolean> = computed(() => this._deleteState().isDeleting);
  readonly deleteSuccess: Signal<boolean> = computed(() => this._deleteState().success);

  register(data: IWordData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      success: false,
    }));

    this.facade
      .register(data)
      .pipe(
        tap((response: IApiResponse<IWordData>) => {
          this._registerState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alertService.success(response.message);
          this.realoadWords();
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

  update(wordId: number, word: IUpdateWordData): void {
    this._updateState.update((s) => ({
      ...s,
      isUpdating: true,
      success: false,
    }));

    this.facade
      .update(wordId, word)
      .pipe(
        tap(() => {
          this._updateState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alertService.success('Palavra atualizada com sucesso.');
          this.realoadWords();
        }),

        catchError(() => {
          this._updateState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),

        finalize(() => {
          this._updateState.update((s) => ({
            ...s,
            isUpdating: false,
          }));
        }),
      )
      .subscribe();
  }

  delete(wordId: number): void {
    this._deleteState.update((s) => ({
      ...s,
      isDeleting: true,
      success: false,
    }));

    this.facade
      .delete(wordId)
      .pipe(
        tap(() => {
          this._deleteState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alertService.success('Palavra deletada com sucesso.');
          this.realoadWords();
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

  private realoadWords(): void {
    this.paginationWordsFacade.loadByDifficulty(this.difficultyService.currentDifficulty!, 0);
  }
}
