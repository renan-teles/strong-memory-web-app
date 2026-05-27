import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { MatchHistoryDashboardApiService } from '../../../data/services/api/match-history-dashboard-api.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { GameHighestScoreDashboardData } from '../../../data/dto/game-highest-score-dashboard-data.dto';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../../shared/utils/request-state.utils';
import { GameModeDashboardData } from '../../../data/dto/game-mode-dashboard-data.dto';

@Injectable({
  providedIn: 'root',
})
export class GameDashboardApiFacade {
  private readonly api: MatchHistoryDashboardApiService = inject(MatchHistoryDashboardApiService);

  private readonly _highestScoresState = signal<RequestState<GameHighestScoreDashboardData[]>>({
    status: 'idle',
    data: [],
  });

  readonly highestScoresData: Signal<GameHighestScoreDashboardData[]> = computed(
    () => this._highestScoresState().data!,
  );
  readonly isLoadingHighestScoresData: Signal<boolean> = computed(
    () => this._highestScoresState().status === 'loading',
  );
  readonly loadingHighestScoresSuccess: Signal<boolean> = computed(
    () => this._highestScoresState().status === 'success',
  );

  private readonly _gameModeState = signal<RequestState<GameModeDashboardData[]>>({
    status: 'idle',
    data: [],
  });

  readonly gameModeData: Signal<GameModeDashboardData[]> = computed(
    () => this._gameModeState().data!,
  );
  readonly isLoadingGameModeData: Signal<boolean> = computed(
    () => this._gameModeState().status === 'loading',
  );
  readonly loadingGameModeDataSuccess: Signal<boolean> = computed(
    () => this._gameModeState().status === 'success',
  );

  loadHighestScoresData(): void {
    setRequestState(this._highestScoresState, 'loading', []);

    this.api
      .loadGameHighestScoresData()
      .pipe(
        tap((response: ApiResponse<GameHighestScoreDashboardData[]>) => {
          setRequestState(this._highestScoresState, 'success', response.data!);
        }),
        catchError(() => {
          setStatusRequestState(this._highestScoresState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  loadGameModeData(): void {
    setRequestState(this._gameModeState, 'loading', []);

    this.api
      .loadGameModeData()
      .pipe(
        tap((response: ApiResponse<GameModeDashboardData[]>) => {
          setRequestState(this._gameModeState, 'success', response.data!);
        }),
        catchError(() => {
          setStatusRequestState(this._gameModeState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
