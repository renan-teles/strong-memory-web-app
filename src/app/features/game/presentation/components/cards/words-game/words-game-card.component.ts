import { Component, inject, Input, OnDestroy, OnInit, Output, Signal } from '@angular/core';
import { TimebarComponent } from '../../timebar/timebar.component';
import { TypingWordsFormComponent } from '../../forms/typing-words/typing-words-form.component';
import { WordsListComponent } from '../../lists/words-list/words-list.component';
import { TitleCasePipe } from '@angular/common';
import { GameFacade } from '../../../state/game/game.facade';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { GameApiFacade } from '../../../state/game/api/game-api.facade';
import { RouterLink } from '@angular/router';
import { GameMatchResponse } from '../../../../data/dto/response/game-match-response';
import { GameMatchService } from '../../../../domain/services/game-match.service';

@Component({
  selector: 'app-words-game-card',
  imports: [
    TimebarComponent,
    TypingWordsFormComponent,
    WordsListComponent,
    TitleCasePipe,
    RouterLink,
  ],
  templateUrl: './words-game-card.component.html',
  styleUrl: './words-game-card.component.css',
})
export class WordsGameCardComponent implements OnInit, OnDestroy {
  private readonly gameApi: GameApiFacade = inject(GameApiFacade);
  private readonly facade: GameFacade = inject(GameFacade);

  @Output() gameStatus = this.facade.gameStatus;

  getMoreWordsLoading: Signal<boolean> = this.gameApi.getMoreWordsLoading;

  answer: Signal<boolean> = this.facade.answer;
  showResult: Signal<boolean> = this.facade.showResult;
  time: Signal<number> = this.facade.decreaseTime;
  isCorrect: Signal<boolean> = this.facade.isCorrect;
  timeToNextRound: Signal<number> = this.facade.timeToNextAction;

  get score(): number {
    return this.facade.score;
  }

  get difficultyName(): string {
    return this.facade.difficulty.name;
  }

  ngOnInit(): void {
    this.facade.init();
  }

  ngOnDestroy(): void {
    this.facade.destroy();
  }

  onTimerFinished(): void {
    this.facade.onTimerFinished();
  }

  checkCorrect(submitWords: string[]): void {
    this.facade.checkCorrect(submitWords);
  }

  restartGame(): void {
    this.facade.restartGame();
  }
}
