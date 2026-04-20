import { inject, Injectable, signal } from '@angular/core';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';

@Injectable({
  providedIn: 'root',
})
export class TimerFacade {
  private readonly displayTimeWords = signal<number>(5);
  private readonly answerTime = signal<number>(30);
  private readonly _time = signal<number>(0);

  readonly decreaseTime = this._time.asReadonly();

  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  get currentDifficulty(): WordDifficultyResponse {
    return this.difficultyService.currentDifficulty!;
  }

  setTimeToDisplayTimerWords(): void {
    this._time.set(this.displayTimeWords());
  }

  setTimeToAnswerTime(): void {
    this._time.set(this.answerTime());
  }

  updateTimes(): void {
    const increaseDisplayTime = this.currentDifficulty.increaseDisplayTimeSeconds;
    const increaseTypingTime = this.currentDifficulty.increaseTypingTimeSeconds;

    this.displayTimeWords.update((t) => t + increaseDisplayTime);
    this.answerTime.update((t) => t + increaseTypingTime);
  }

  resetTimer(): void {
    this.displayTimeWords.set(5);
    this.answerTime.set(30);
  }
}
