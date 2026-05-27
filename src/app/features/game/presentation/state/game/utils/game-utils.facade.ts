import { inject, Injectable, Signal } from '@angular/core';
import { tap, catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../../../../../../shared/services/alert/alert.service';
import { ToastService } from '../../../../../../shared/services/toast/toast.service';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { DrawnWordResponse } from '../../../../data/dto/response/drawn-word-response';
import { FinishGameResponse } from '../../../../data/dto/response/finish-game-response';
import { MatchResult } from '../../../../domain/enums/match-result.enum';
import { GameApiFacade } from '../api/game-api.facade';
import { MatchMode } from '../../../../domain/enums/match-mode.enum';
import { WordDifficultyService } from '../../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { InvalidParamError } from '../../../../../../core/errors/invalid-param.error';
import { GameMatchService } from '../../../../domain/services/game-match.service';
import { GameMatchResponse } from '../../../../data/dto/response/game-match-response';
import { AuthStateService } from '../../../../../../core/services/auth/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class GameUtilsFacade {
  private readonly gameApi: GameApiFacade = inject(GameApiFacade);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly gameService: GameMatchService = inject(GameMatchService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly authState: AuthStateService = inject(AuthStateService);

  private difficultyParam: string | null = null;
  private modeParam: MatchMode | null = null;

  private isStarting: Signal<boolean> = this.gameApi.isStarting;

  loadGameData(): Observable<ApiResponse<GameMatchResponse>> | void {
    if (!this.difficultyParam || !this.modeParam) {
      throw new InvalidParamError('Parâmetros para início do jogo inválidos.');
    }

    if (this.isStarting()) return;

    const isDemo: boolean = !this.authState.isAuthenticated();

    this.gameApi
      .start({ difficulty: this.difficultyParam!, mode: this.modeParam! }, isDemo)
      .pipe(
        tap((response: ApiResponse<GameMatchResponse>) => {
          this.gameService.setMatch(response.data!);
        }),
      )
      .subscribe();
  }

  gaveUpMatch(): void {
    if (this.gameService.isInDemo()) return;

    this.gameService.setMatchResult(MatchResult.GAVE_UP);

    this.gameApi
      .finish(this.gameService.getMatchData())
      .pipe(
        catchError(() => {
          this.alertService.error('Falha ao persistir dados de desistência da partida.');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  finishMatch(result: MatchResult): void {
    if (this.gameService.isInDemo()) return;

    this.gameService.setMatchResult(result);

    this.gameApi
      .finish(this.gameService.getMatchData())
      .pipe(
        tap((response: ApiResponse<FinishGameResponse>) => {
          if (response.data!.hasNewHighestScore) {
            this.toastService.showNewHighestScore('Nova Maior Pontuação', [
              `Pontuação: ${response.data!.highestScore}`,
            ]);
          }
        }),
        catchError(() => {
          this.alertService.error('Falha ao registrar dados de finalização da partida.');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  getMoreWords(
    returnObservable: boolean = false,
  ): void | Observable<ApiResponse<DrawnWordResponse[]>> {
    this.toastService.showWarning('Buscando Novas Palavras', [
      'Aguarde enquanto novas palavras são adicionadas ao jogo.',
    ]);

    const obs = this.gameApi
      .moreRandomWords(
        this.gameService.getMatchId(),
        this.gameService.getDrawnWordsCounter(),
        this.gameService.isInDemo(),
        this.gameService.getDifficultyName(),
      )
      .pipe(
        tap((response: ApiResponse<DrawnWordResponse[]>) => {
          this.gameService.addMoreDrawnWords(response.data!);
        }),
      );

    if (returnObservable) return obs;
    obs.subscribe();
  }

  setParams(difficulty: string, mode: MatchMode) {
    if (!this.difficultyService.containsByName(difficulty)) {
      throw new Error(`Parâmetro de dificuldade inválido.`);
    }

    this.difficultyParam = difficulty;
    this.modeParam = mode;
  }
}
