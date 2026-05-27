import { inject, Injectable, Signal, signal } from '@angular/core';
import { GameMatchService } from '../../../../domain/services/game-match.service';

@Injectable({
  providedIn: 'root',
})
export class TimerFacade {
  private readonly gameService: GameMatchService = inject(GameMatchService);

  private readonly _displayTimeWords = signal<number>(5);
  private readonly _answerTime = signal<number>(30);

  private readonly _time = signal<number>(0);

  decreaseTime: Signal<number> = this._time.asReadonly();

  setTimeToDisplayTimerWords(): void {
    this._time.set(this._displayTimeWords());
  }

  setTimeToAnswerTime(): void {
    this._time.set(this._answerTime());
  }

  updateTimes(): void {
    this._displayTimeWords.update((t) => t + this.gameService.getIncreaseDisplayTime());
    this._answerTime.update((t) => t + this.gameService.getIncreaseTypingTime());
  }

  resetTimer(): void {
    this._displayTimeWords.set(5);
    this._answerTime.set(30);
  }
}
