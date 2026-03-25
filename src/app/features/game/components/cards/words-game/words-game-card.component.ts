import { Component, inject, OnDestroy, OnInit, Output, Signal } from '@angular/core';
import { TimebarComponent } from '../../timebar/timebar.component';
import { TypingWordsFormComponent } from '../../forms/typing-words-form/typing-words-form.component';
import { WordsListComponent } from '../../lists/words-list/words-list.component';
import { WordsGameFacade } from '../../../facades/game/words-game.facade';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { LoadRandomWordsUiFacade } from '../../../../words/facades/ui/load-random-words/load-random-words-ui.facade';
import { ToastService } from '../../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-words-game-card',
  imports: [TimebarComponent, TypingWordsFormComponent, WordsListComponent],
  templateUrl: './words-game-card.component.html',
  styleUrl: './words-game-card.component.css',
})
export class WordsGameCardComponent implements OnInit, OnDestroy {
  private readonly difficultyService = inject(WordDifficultService);
  private readonly facade: LoadRandomWordsUiFacade = inject(LoadRandomWordsUiFacade);
  private readonly wordsGameFacade: WordsGameFacade = inject(WordsGameFacade);
  private readonly toastService: ToastService = inject(ToastService);

  @Output() gameState = this.wordsGameFacade.gameState;

  answer: Signal<boolean> = this.wordsGameFacade.answer;
  showResult: Signal<boolean> = this.wordsGameFacade.showResult;
  time: Signal<number> = this.wordsGameFacade.decreaseTime;
  isCorrect: Signal<boolean> = this.wordsGameFacade.isCorrect;
  timeToNextRound: Signal<number> = this.wordsGameFacade.timeToNextAction;
  score: Signal<number> = this.wordsGameFacade.score;

  get currentDifficulty(): IWordDifficultyData {
    return this.difficultyService.currentDifficulty;
  }

  ngOnInit(): void {
    this.wordsGameFacade.init(this.facade.randomWords());
  }

  ngOnDestroy(): void {
    this.wordsGameFacade.onDestroy();
    this.toastService.clear();
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
