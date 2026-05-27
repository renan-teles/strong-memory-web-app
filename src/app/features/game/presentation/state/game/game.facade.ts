import { computed, EventEmitter, inject, Injectable, signal, Signal } from '@angular/core';
import { GameState } from './game-state.type';
import { ToastService } from '../../../../../shared/services/toast/toast.service';
import { TimerFacade } from './time/timer.facade';
import { GameUserFacade } from './user/game-user.facade';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { GameUserState } from './game-user-state.type';
import { RoundGameState } from './round-game-state.type';
import { MatchResult } from '../../../domain/enums/match-result.enum';
import { GameUtilsFacade } from './utils/game-utils.facade';
import { isObservable, Observable, tap } from 'rxjs';
import { GameMatchService } from '../../../domain/services/game-match.service';
import { GameStatus } from './game-status.interface';

@Injectable({
  providedIn: 'root',
})
export class GameFacade {
  readonly gameStatus: EventEmitter<GameStatus> = new EventEmitter<GameStatus>();

  private readonly gameService: GameMatchService = inject(GameMatchService);
  private readonly gameUtils: GameUtilsFacade = inject(GameUtilsFacade);
  private readonly toastService: ToastService = inject(ToastService);

  private readonly timerFacade: TimerFacade = inject(TimerFacade);
  private readonly userFacade: GameUserFacade = inject(GameUserFacade);

  private readonly roundState = signal<RoundGameState>('show-words');

  readonly answer: Signal<boolean> = computed(() => this.roundState() === 'answer');
  readonly showResult: Signal<boolean> = computed(() => this.roundState() === 'show-result');

  decreaseTime: Signal<number> = this.timerFacade.decreaseTime;
  isCorrect: Signal<boolean> = this.userFacade.isCorrect;
  userState: Signal<GameUserState> = this.userFacade.userState;
  hasUserState: Signal<boolean> = this.userFacade.hasUserState;

  get score(): number {
    return this.gameService.getCurrentScore();
  }

  get difficulty(): WordDifficultyResponse {
    return this.gameService.getDifficulty();
  }

  private timeToNextRoundIntervalId: number = 0;
  private readonly _timeToNextAction = signal<number>(3);
  timeToNextAction = this._timeToNextAction.asReadonly();

  init(): void {
    this.startRound();
  }

  private startRound(): void {
    try {
      this.gameService.next();

      this.roundState.set('show-words');
      this.userFacade.setToNoResult();
      this.timerFacade.setTimeToDisplayTimerWords();

      this.emitStatus('show-game');
    } catch (error) {
      console.error(error);
      this.emitStatus('error');
    }
  }

  nextRound(): void {
    this.timerFacade.updateTimes();
    this.startRound();
  }

  checkCorrect(userWords: string[]): void {
    try {
      this.gameService.setResults(userWords);
      this.roundState.set('show-result');

      if (this.incorrect()) return;

      this.correct();

      if (this.inEnd()) return;

      this.startTimeToNextRound();
    } catch (error) {
      console.error(error);
      this.emitStatus('error');
    }
  }

  onTimerFinished(): void {
    if (this.answer()) {
      this.gameUtils.finishMatch(MatchResult.TIMEOUT);
      this.emitStatus('no-time-left');
      return;
    }

    this.roundState.set('answer');
    this.timerFacade.setTimeToAnswerTime();
  }

  restartGame(): void {
    this.destroy();
    this.gameUtils.loadGameData();
    this.toastService.clear();
  }

  destroy(): void {
    this.gameService.reset();
    this.timerFacade.resetTimer();
    clearInterval(this.timeToNextRoundIntervalId);
  }

  private startTimeToNextRound(): void {
    this.timeToNextRoundIntervalId = setInterval(() => {
      this._timeToNextAction.update((t) => {
        if (t <= 0) {
          clearInterval(this.timeToNextRoundIntervalId);
          this.nextRound();
          return 3;
        }
        return t - 1;
      });
    }, 1000);
  }

  private correct(): void {
    this.toastService.showSuccess('Você Acertou!', [
      `+ 1 Ponto`,
      `+ ${this.gameService.getIncreaseDisplayTime()} segundos de exibição`,
      `+ ${this.gameService.getIncreaseTypingTime()} segundos de digitação`,
    ]);

    this.userFacade.setToCorrect();
    this.gameService.increaseScore();
  }

  private incorrect(): boolean {
    if (!this.gameService.isGameOver()) return false;

    this.gameUtils.finishMatch(MatchResult.GAME_OVER);

    this.toastService.showError('Ops..Você Errou.', ['Tente novamente']);
    this.userFacade.setToWrong();
    this.timerFacade.resetTimer();

    return true;
  }

  private inEnd(): boolean {
    if (!this.gameService.IsInEnd()) return false;

    if (this.gameService.isFiniteMode()) {
      this.gameUtils.finishMatch(MatchResult.COMPLETED);

      this.timerFacade.resetTimer();
      this.emitStatus('end');

      return true;
    }

    const obs: Observable<any> | void = this.gameUtils.getMoreWords(true);
    if (isObservable(obs)) {
      obs.pipe(tap(() => this.startTimeToNextRound())).subscribe();
    }

    return true;
  }

  private emitStatus(state: GameState) {
    this.gameStatus.emit({ state: state, scoreAchieved: this.gameService.getCurrentScore() });
  }
}
