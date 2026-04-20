import { computed, EventEmitter, inject, Injectable, Signal, signal } from '@angular/core';
import { WordsGameService } from '../../services/words-game/words-game.service';
import { TimerFacade } from '../timer/timer.facade';
import { GameUserFacade } from '../user/game-user.facade';
import { ScoreFacade } from '../score/score.facade';
import { ToastService } from '../../../../../shared/services/toast/toast.service';
import { RoundGameState } from './round-game-state.type';
import { GameState } from './game-state.type';
import { GameUserState } from './game-user-state.type';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordResponse } from '../../../../words/data/dto/response/word-response';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';

@Injectable({
  providedIn: 'root',
})
export class WordsGameFacade {
  readonly gameState: EventEmitter<GameState> = new EventEmitter<GameState>();

  private readonly wordsGameService: WordsGameService = inject(WordsGameService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly timerFacade: TimerFacade = inject(TimerFacade);
  private readonly userFacade: GameUserFacade = inject(GameUserFacade);
  private readonly scoreFacade: ScoreFacade = inject(ScoreFacade);

  private readonly roundState = signal<RoundGameState>('show-words');

  readonly answer: Signal<boolean> = computed(() => this.roundState() === 'answer');
  readonly showResult: Signal<boolean> = computed(() => this.roundState() === 'show-result');

  decreaseTime: Signal<number> = this.timerFacade.decreaseTime;
  isCorrect: Signal<boolean> = this.userFacade.isCorrect;
  userState: Signal<GameUserState> = this.userFacade.userState;
  hasUserState: Signal<boolean> = this.userFacade.hasUserState;
  score: Signal<number> = this.scoreFacade.score;

  private timeToNextRoundIntervalId: number = 0;
  private readonly _timeToNextAction = signal<number>(3);
  timeToNextAction = this._timeToNextAction.asReadonly();

  get currentDifficulty(): WordDifficultyResponse {
    return this.difficultyService.currentDifficulty!;
  }

  init(words: WordResponse[]): void {
    this.wordsGameService.setWords(words);
    this.scoreFacade.resetScore();
    this.startRound();
  }

  onDestroy(): void {
    this.wordsGameService.reset();
    this.timerFacade.resetTimer();
    clearInterval(this.timeToNextRoundIntervalId);
  }

  onTimerFinished(): void {
    if (this.answer()) {
      this.scoreFacade.saveHighestScore();
      this.gameState.emit('no-time-left');
      return;
    }
    this.roundState.set('answer');
    this.timerFacade.setTimeToAnswerTime();
  }

  checkCorrect(userWords: string[]): void {
    try {
      this.wordsGameService.setUserWords(userWords);
      this.roundState.set('show-result');

      if (this.incorrect()) return;
      this.correct();

      if (this.inEnd()) return;
      this.startTimeToNextRound();
    } catch (error) {
      console.error(error);
      this.gameState.emit('error');
    }
  }

  nextRound(): void {
    this.timerFacade.updateTimes();
    this.startRound();
  }

  resetGame(): void {
    this.wordsGameService.reset();
    this.scoreFacade.resetScore();
    this.timerFacade.resetTimer();
    clearInterval(this.timeToNextRoundIntervalId);
    this.startRound();
  }

  private startRound(): void {
    try {
      this.wordsGameService.next();
      this.roundState.set('show-words');
      this.userFacade.setToNoResult();
      this.timerFacade.setTimeToDisplayTimerWords();
      this.gameState.emit('show-game');
    } catch (error) {
      console.error(error);
      this.gameState.emit('error');
    }
  }

  private correct(): void {
    this.toastService.showSuccess('Você Acertou!', [
      `+ 1 Ponto`,
      `+ ${this.currentDifficulty.increaseDisplayTimeSeconds} segundos de tempo de exibição`,
      `+ ${this.currentDifficulty.increaseTypingTimeSeconds} segundos de tempo de digitação`,
    ]);
    this.userFacade.setToCorrect();
    this.scoreFacade.updateScore();
  }

  private incorrect(): boolean {
    if (this.wordsGameService.isCorrect()) return false;

    this.scoreFacade.saveHighestScore();
    this.toastService.showError('Ops..Você Errou.', ['Tente novamente']);
    this.userFacade.setToWrong();
    this.timerFacade.resetTimer();
    return true;
  }

  private inEnd(): boolean {
    if (!this.wordsGameService.isInEnd()) return false;

    this.scoreFacade.saveHighestScore();
    this.timerFacade.resetTimer();
    this.gameState.emit('end');
    return true;
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
}
