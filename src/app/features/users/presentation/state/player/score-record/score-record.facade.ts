import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { PlayerApiService } from '../../../../data/services/users-api/player/player-api.service';
import { ToastService } from '../../../../../../shared/services/toast/toast.service';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { ScoreRecordResponse } from '../../../../data/dto/response/score-record-response';
import {
  setDataRequestState,
  setRequestState,
  setStatusRequestState,
} from '../../../../../../shared/utils/request-state.utils';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { catchError, EMPTY, tap } from 'rxjs';
import { UpdateScoreRecordRequest } from '../../../../data/dto/request/update-score-record-request';

@Injectable({
  providedIn: 'root',
})
export class ScoreRecordFacade {
  private readonly api: PlayerApiService = inject(PlayerApiService);
  private readonly toastService: ToastService = inject(ToastService);

  private readonly _loadScoreRecordsState = signal<RequestState<ScoreRecordResponse[]>>({
    status: 'idle',
    data: [],
  });

  private readonly _loadScoreRecordState = signal<RequestState<ScoreRecordResponse | null>>({
    status: 'idle',
    data: null,
  });

  private readonly _updateState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly scores: Signal<ScoreRecordResponse[]> = computed(
    () => this._loadScoreRecordsState().data!,
  );
  readonly isLoadingScores: Signal<boolean> = computed(
    () => this._loadScoreRecordsState().status === 'loading',
  );
  readonly loadSuccessScores: Signal<boolean> = computed(
    () => this._loadScoreRecordsState().status === 'success',
  );

  readonly score: Signal<ScoreRecordResponse | null> = computed(
    () => this._loadScoreRecordState().data!,
  );
  readonly isLoadingScore: Signal<boolean> = computed(
    () => this._loadScoreRecordState().status === 'loading',
  );
  readonly loadSuccessScore: Signal<boolean> = computed(
    () => this._loadScoreRecordState().status === 'success',
  );

  readonly isUpdatingScoreRecord: Signal<boolean> = computed(
    () => this._updateState().status === 'loading',
  );

  loadScoreRecords(): void {
    setRequestState(this._loadScoreRecordsState, 'loading', []);

    this.api
      .loadScoreRecords()
      .pipe(
        tap((response: ApiResponse<ScoreRecordResponse[]>) => {
          setRequestState(this._loadScoreRecordsState, 'success', response.data!);
        }),
        catchError(() => {
          setStatusRequestState(this._loadScoreRecordsState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  loadScoreRecord(difficulty: string): void {
    setRequestState(this._loadScoreRecordState, 'loading', null);

    this.api
      .loadScoreRecord(difficulty)
      .pipe(
        tap((response: ApiResponse<ScoreRecordResponse>) => {
          setRequestState(this._loadScoreRecordState, 'success', response.data!);
        }),
        catchError(() => {
          setStatusRequestState(this._loadScoreRecordState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  updateScoreRecord(scoreId: number, data: UpdateScoreRecordRequest): void {
    setStatusRequestState(this._updateState, 'loading');

    this.api
      .updateScoreRecord(scoreId, data)
      .pipe(
        tap((response: ApiResponse<ScoreRecordResponse>) => {
          setStatusRequestState(this._updateState, 'success');
          setDataRequestState(this._loadScoreRecordState, response.data!);

          this.toastService.showNewHighestScore('Nova Maior Pontuação!', [
            'Nova maior pontuação alcançada para a dificuldade selecionada.',
          ]);
        }),
        catchError(() => {
          setStatusRequestState(this._updateState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
