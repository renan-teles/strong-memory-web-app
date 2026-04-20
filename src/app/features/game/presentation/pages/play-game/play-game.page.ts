import { Component, computed, DestroyRef, inject, OnInit, signal, Signal } from '@angular/core';
import { WordsGameCardComponent } from '../../components/cards/words-game/words-game-card.component';
import { NoTimeLeftComponent } from '../../components/no-time-left/no-time-left.component';
import { EndGameComponent } from '../../components/end-game/end-game.component';
import { GameState } from '../../state/game/game-state.type';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyService } from '../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { ErrorComponent } from '../../../../../shared/ui/components/error/error.component';
import { LoadingContentComponent } from '../../../../../shared/ui/components/loading-content/loading-content.component';
import { LoadRandomWordsFacade } from '../../../../words/presentation/state/load-random-words/load-random-words.facade';
import { ScoreRecordFacade } from '../../../../users/presentation/state/player/score-record/score-record.facade';
import { AuthStorageService } from '../../../../../core/services/auth-storage/auth-storage.service';
import { ToastService } from '../../../../../shared/services/toast/toast.service';

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
  private readonly scoreFacade: ScoreRecordFacade = inject(ScoreRecordFacade);
  private readonly randomWordsFacade: LoadRandomWordsFacade = inject(LoadRandomWordsFacade);
  private readonly currentRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);
  private readonly toastService: ToastService = inject(ToastService);

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
        const difficulty: WordDifficultyResponse | null = this.getDifficultyByParam(
          params.get('difficulty'),
        );
        if (!difficulty) return;
        this.loadGameData(difficulty);
      });
  }

  private loadGameData(difficulty: WordDifficultyResponse): void {
    this.randomWordsFacade.loadRandom(difficulty);

    if (this.authStorage.isPlayer()) {
      this.scoreFacade.loadScoreRecord(difficulty.difficulty);
      return;
    }
    this.toastService.showWarning('Atenção', [
      'Entre com sua conta para salvar as pontuações alcançadas.',
    ]);
  }

  private getDifficultyByParam(param: string | null): WordDifficultyResponse | null {
    if (!param) {
      this.isValidParam.set(false);
      return null;
    }

    const difficulty: WordDifficultyResponse | undefined =
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
