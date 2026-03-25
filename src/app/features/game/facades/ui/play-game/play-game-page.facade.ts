import { computed, DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { LoadRandomWordsUiFacade } from '../../../../words/facades/ui/load-random-words/load-random-words-ui.facade';

@Injectable({
  providedIn: 'root',
})
export class PlayGameUiFacade {
  private readonly randomWordsFacade: LoadRandomWordsUiFacade = inject(LoadRandomWordsUiFacade);
  private readonly currentRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly difficultyService: WordDifficultService = inject(WordDifficultService);

  private readonly isValidParam = signal<boolean>(true);

  loadingRandomWords: Signal<boolean> = this.randomWordsFacade.isLoading;
  loadingRandomWordsSuccess: Signal<boolean> = computed(() => {
    return this.isValidParam() && this.randomWordsFacade.success();
  });

  loadRandomWords(): void {
    this.currentRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const difficulty: IWordDifficultyData | null = this.getDifficultyByParam(
          params.get('difficulty'),
        );

        if (!difficulty) return;

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
