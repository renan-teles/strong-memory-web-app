import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { GameApiService } from '../../../../data/services/game/game-api.service';
import { StartGameRequest } from '../../../../data/dto/request/start-game-request';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { setStatusRequestState } from '../../../../../../shared/utils/request-state.utils';
import { FinishGameResponse } from '../../../../data/dto/response/finish-game-response';
import { DrawnWordResponse } from '../../../../data/dto/response/drawn-word-response';
import { GameMatchResponse } from '../../../../data/dto/response/game-match-response';

@Injectable({
  providedIn: 'root',
})
export class GameApiFacade {
  private readonly gameApi: GameApiService = inject(GameApiService);

  private readonly _startState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly isStarting: Signal<boolean> = computed(() => this._startState().status === 'loading');
  readonly startingSuccess: Signal<boolean> = computed(
    () => this._startState().status === 'success',
  );

  private readonly _finishState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly finishLoading: Signal<boolean> = computed(
    () => this._finishState().status === 'loading',
  );
  readonly finishSuccess: Signal<boolean> = computed(
    () => this._finishState().status === 'success',
  );

  private readonly _getMoreWordsState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly getMoreWordsLoading: Signal<boolean> = computed(
    () => this._getMoreWordsState().status === 'loading',
  );
  readonly getMoreWordsSuccess: Signal<boolean> = computed(
    () => this._getMoreWordsState().status === 'success',
  );

  start(
    data: StartGameRequest,
    isDemo: boolean = false,
  ): Observable<ApiResponse<GameMatchResponse>> {
    setStatusRequestState(this._startState, 'loading');

    return this.gameApi.start(data, isDemo).pipe(
      tap(() => {
        setStatusRequestState(this._startState, 'success');
      }),
      catchError(() => {
        setStatusRequestState(this._startState, 'error');
        return EMPTY;
      }),
    );
  }

  finish(data: GameMatchResponse): Observable<ApiResponse<FinishGameResponse>> {
    setStatusRequestState(this._finishState, 'loading');

    return this.gameApi.finish(data).pipe(
      tap(() => {
        setStatusRequestState(this._finishState, 'success');
      }),
      catchError((error) => {
        setStatusRequestState(this._finishState, 'error');
        return throwError(() => error);
      }),
    );
  }

  moreRandomWords(
    matchId: number | null,
    startOrderIndex: number,
    isDemo: boolean = false,
    difficulty: string = '',
  ): Observable<ApiResponse<DrawnWordResponse[]>> {
    setStatusRequestState(this._getMoreWordsState, 'loading');

    return this.gameApi.moreRandomWords(matchId, startOrderIndex, isDemo, difficulty).pipe(
      tap(() => {
        setStatusRequestState(this._getMoreWordsState, 'success');
      }),
      catchError(() => {
        setStatusRequestState(this._getMoreWordsState, 'error');
        return EMPTY;
      }),
    );
  }
}
