import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IUserScoreRecord } from '../../../models/user-score-record.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ILoadDataState } from '../../../../../shared/models/load-data-state.interface';
import { UsersFacade } from '../../users.facade';
import { IUpdateState } from '../../../../../shared/models/update-state.interface';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { IUpdateScoreData } from '../../../models/update-score-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerScoreRecordsUiFacade {
  private readonly facade: UsersFacade = inject(UsersFacade);
  private readonly toastService: ToastService = inject(ToastService);

  private readonly _loadScoreRecordsState = signal<ILoadDataState<IUserScoreRecord[]>>({
    isLoading: false,
    values: [],
    success: false,
  });

  private readonly _loadScoreRecordState = signal<ILoadDataState<IUserScoreRecord | null>>({
    isLoading: false,
    values: null,
    success: false,
  });

  private readonly _updateState = signal<IUpdateState>({
    isUpdating: false,
    success: false,
  });

  readonly scores: Signal<IUserScoreRecord[]> = computed(
    () => this._loadScoreRecordsState().values,
  );
  readonly isLoadingScores: Signal<boolean> = computed(
    () => this._loadScoreRecordsState().isLoading,
  );
  readonly loadSuccessScores: Signal<boolean> = computed(
    () => this._loadScoreRecordsState().success,
  );

  readonly score: Signal<IUserScoreRecord | null> = computed(
    () => this._loadScoreRecordState().values,
  );
  readonly isLoadingScore: Signal<boolean> = computed(() => this._loadScoreRecordState().isLoading);
  readonly loadSuccessScore: Signal<boolean> = computed(() => this._loadScoreRecordState().success);

  loadScoreRecords(): void {
    this._loadScoreRecordsState.update((s) => ({
      ...s,
      isLoading: true,
      success: false,
      values: [],
    }));

    this.facade
      .loadPlayerScoreRecords()
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord[]>) => {
          this._loadScoreRecordsState.update((s) => ({
            ...s,
            values: response.data!,
            success: true,
          }));
        }),
        catchError(() => {
          this._loadScoreRecordsState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._loadScoreRecordsState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }

  loadScoreRecord(difficulty: string): void {
    this._loadScoreRecordState.update((s) => ({
      ...s,
      isLoading: true,
      success: false,
      values: null,
    }));

    this.facade
      .loadScoreRecord(difficulty)
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord>) => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            success: true,
            values: response.data!,
          }));
        }),
        catchError(() => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }

  updateScoreRecord(scoreId: string, data: IUpdateScoreData): void {
    this._updateState.update((s) => ({
      ...s,
      isUpdating: true,
      success: false,
    }));

    this.facade
      .updateScoreRecord(scoreId, data)
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord>) => {
          this._updateState.update((s) => ({
            ...s,
            success: true,
          }));
          this._loadScoreRecordState.update((s) => ({
            ...s,
            values: response.data!,
          }));
          this.toastService.showWarning('Nova Maior Pontuação!', [
            'Nova maior pontuação alcançada para a dificuldade selecionada.',
          ]);
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
}
