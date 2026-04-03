import { Component, computed, DestroyRef, inject, OnInit, signal, Signal } from '@angular/core';
import { WordsGameCardComponent } from '../../components/cards/words-game/words-game-card.component';
import { NoTimeLeftComponent } from '../../components/no-time-left/no-time-left.component';
import { EndGameComponent } from '../../components/end-game/end-game.component';
import { GameState } from '../../types/game-state.type';
import { PlayerScoreRecordsUiFacade } from '../../../users/facades/ui/score-records/player-score-records-ui.facade';
import { LoadRandomWordsUiFacade } from '../../../words/facades/ui/load-random-words/load-random-words-ui.facade';
import { ActivatedRoute } from '@angular/router';
import { WordDifficultyService } from '../../../../core/services/word-difficulty/word-difficulty.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IWordDifficultyData } from '../../../../shared/models/word-difficulty-data.interface';
import { LoadingContentComponent } from '../../../../shared/components/loading-content/loading-content.component';
import { ErrorComponent } from '../../../../shared/components/error/error.component';

@Component({
  selector: 'app-play-game',
  imports: [
    WordsGameCardComponent,
    ErrorComponent,
    NoTimeLeftComponent,
    EndGameComponent,
    LoadingContentComponent,
  ],
  templateUrl: './play-game.page.html',
  styleUrl: './play-game.page.css',
})
export class PlayGamePage implements OnInit {
  private readonly scoreFacade = inject(PlayerScoreRecordsUiFacade);
  private readonly randomWordsFacade: LoadRandomWordsUiFacade = inject(LoadRandomWordsUiFacade);
  private readonly currentRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  private readonly isValidParam = signal<boolean>(true);

  readonly gameState = signal<GameState>('show-game');

  loadingGame: Signal<boolean> = computed(
    () => this.randomWordsFacade.isLoading() || this.scoreFacade.isLoadingScore(),
  );

  loadingGameSuccess: Signal<boolean> = computed(
    () =>
      this.isValidParam() ||
      this.randomWordsFacade.success() ||
      this.scoreFacade.loadSuccessScore(),
  );

  ngOnInit(): void {
    this.prepareGame();
  }

  setState(state: any): void {
    this.gameState.set(state);
  }

  prepareGame(): void {
    this.currentRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const difficulty: IWordDifficultyData | null = this.getDifficultyByParam(
          params.get('difficulty'),
        );

        if (!difficulty) return;

        this.scoreFacade.loadScoreRecord(difficulty.difficulty);
        this.randomWordsFacade.loadRandom(difficulty);
      });
  }

  private getDifficultyByParam(param: string | null): IWordDifficultyData | null {
    if (!param) {
      this.isValidParam.set(false);
      return null;
    }

    const difficulty: IWordDifficultyData | undefined =
      this.difficultyService.getDifficultByName(param);

    if (!difficulty) {
      this.isValidParam.set(false);
      return null;
    }

    this.isValidParam.set(true);
    this.difficultyService.setCurrentDifficulty(difficulty);

    return difficulty;
  }
}
