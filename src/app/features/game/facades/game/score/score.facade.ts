import { inject, Injectable, Signal, signal } from '@angular/core';
import { PlayerScoreRecordsUiFacade } from '../../../../users/facades/ui/score-records/player-score-records-ui.facade';
import { IUserScoreRecord } from '../../../../users/models/user-score-record.interface';

@Injectable({
  providedIn: 'root',
})
export class ScoreFacade {
  private readonly playerScoreFacade: PlayerScoreRecordsUiFacade = inject(
    PlayerScoreRecordsUiFacade,
  );

  private readonly highestScore: Signal<IUserScoreRecord | null> = this.playerScoreFacade.score;

  private hasNewHighestScore: boolean = false;

  private readonly _score = signal<number>(0);
  score: Signal<number> = this._score.asReadonly();

  updateScore(): void {
    this._score.update((s) => s + 1);

    if (!this.highestScore()) return;
    this.hasNewHighestScore = this.score() > this.highestScore()!.score;
  }

  resetScore(): void {
    this.hasNewHighestScore = false;
    this._score.set(0);
  }

  saveHighestScore(): void {
    if (!this.hasNewHighestScore) return;

    const newScore: number = this.score();
    const scoreId: number | undefined = this.playerScoreFacade.score()?.id;
    if (!scoreId) return;

    this.playerScoreFacade.updateScoreRecord(`${scoreId}`, { newScore });

    this.hasNewHighestScore = false;
  }
}
