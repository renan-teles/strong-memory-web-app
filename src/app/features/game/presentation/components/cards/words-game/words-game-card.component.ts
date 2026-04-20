import { Component, inject, OnDestroy, OnInit, Output, Signal } from '@angular/core';
import { TimebarComponent } from '../../timebar/timebar.component';
import { TypingWordsFormComponent } from '../../forms/typing-words-form/typing-words-form.component';
import { WordsListComponent } from '../../lists/words-list/words-list.component';
import { WordsGameFacade } from '../../../state/game/words-game.facade';
import { ToastService } from '../../../../../../shared/services/toast/toast.service';
import { TitleCasePipe } from '@angular/common';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyService } from '../../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { LoadingContentComponent } from '../../../../../../shared/ui/components/loading-content/loading-content.component';
import { LoadRandomWordsFacade } from '../../../../../words/presentation/state/load-random-words/load-random-words.facade';
import { ScoreRecordFacade } from '../../../../../users/presentation/state/player/score-record/score-record.facade';

@Component({
  selector: 'app-words-game-card',
  imports: [
    TimebarComponent,
    TypingWordsFormComponent,
    WordsListComponent,
    TitleCasePipe,
    LoadingContentComponent,
  ],
  templateUrl: './words-game-card.component.html',
  styleUrl: './words-game-card.component.css',
})
export class WordsGameCardComponent implements OnInit, OnDestroy {
  private readonly difficultyService = inject(WordDifficultyService);
  private readonly facade: LoadRandomWordsFacade = inject(LoadRandomWordsFacade);
  private readonly wordsGameFacade: WordsGameFacade = inject(WordsGameFacade);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly scoreRecordService: ScoreRecordFacade = inject(ScoreRecordFacade);

  @Output() gameState = this.wordsGameFacade.gameState;

  isUpdatingScore: Signal<boolean> = this.scoreRecordService.isUpdatingScoreRecord;
  answer: Signal<boolean> = this.wordsGameFacade.answer;
  showResult: Signal<boolean> = this.wordsGameFacade.showResult;
  time: Signal<number> = this.wordsGameFacade.decreaseTime;
  isCorrect: Signal<boolean> = this.wordsGameFacade.isCorrect;
  timeToNextRound: Signal<number> = this.wordsGameFacade.timeToNextAction;
  score: Signal<number> = this.wordsGameFacade.score;

  get currentDifficulty(): WordDifficultyResponse {
    return this.difficultyService.currentDifficulty!;
  }

  ngOnInit(): void {
    this.wordsGameFacade.init(this.facade.randomWords());
  }

  ngOnDestroy(): void {
    this.wordsGameFacade.onDestroy();
    if (!this.isUpdatingScore()) this.toastService.clear();
  }

  onTimerFinished(): void {
    this.wordsGameFacade.onTimerFinished();
  }

  checkCorrect(submitWords: string[]): void {
    this.wordsGameFacade.checkCorrect(submitWords);
  }

  reloadGame(): void {
    location.reload();
  }

  resetGame(): void {
    this.wordsGameFacade.resetGame();
  }
}
