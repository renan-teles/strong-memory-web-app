import { inject, Injectable, Signal, signal } from '@angular/core';
import { ScoreRecordResponse } from '../../../../users/data/dto/response/score-record-response';
import { ScoreRecordFacade } from '../../../../users/presentation/state/player/score-record/score-record.facade';
import { AuthStorageService } from '../../../../../core/services/auth-storage/auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreFacade {
  private readonly playerScoreFacade: ScoreRecordFacade = inject(ScoreRecordFacade);
  private readonly authStorageService: AuthStorageService = inject(AuthStorageService);

  private readonly highestScore: Signal<ScoreRecordResponse | null> = this.playerScoreFacade.score;

  private hasNewHighestScore: boolean = false;

  private readonly _score = signal<number>(0);
  readonly score: Signal<number> = this._score.asReadonly();

  resetScore(): void {
    this.hasNewHighestScore = false;
    this._score.set(0);
  }

  updateScore(): void {
    this._score.update((s) => s + 1);

    if (!this.authStorageService.isPlayer() || !this.highestScore()) return;
    this.hasNewHighestScore = this.score() > this.highestScore()!.score;
  }

  saveHighestScore(): void {
    if (!this.authStorageService.isPlayer() || !this.hasNewHighestScore) return;

    const newScore: number = this.score();
    const scoreId: number | undefined = this.playerScoreFacade.score()?.id;
    if (!scoreId) return;

    this.playerScoreFacade.updateScoreRecord(scoreId, { newScore });

    this.hasNewHighestScore = false;
  }
}
