import { inject, Injectable, Signal } from '@angular/core';
import { WordDifficultyResponse } from '../../../data/dto/response/word-difficulty-response';
import { WordDifficultyFacade } from '../../state/word-difficulty.facade';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyService {
  private readonly difficultyFacade = inject(WordDifficultyFacade);

  private readonly difficulties: Signal<WordDifficultyResponse[]> =
    this.difficultyFacade.difficulties;

  currentDifficulty: WordDifficultyResponse | null = null;

  getDifficultByName(name: string): WordDifficultyResponse | undefined {
    return this.difficulties().find((d) => d.difficulty === name);
  }

  setCurrentDifficulty(diff: WordDifficultyResponse): void {
    this.currentDifficulty = diff;
  }

  setCurrentDifficultyByName(difficultyName: string): void {
    const difficulty: WordDifficultyResponse | undefined = this.getDifficultByName(difficultyName);
    if (!difficulty) return;

    this.currentDifficulty = difficulty;
  }

  loadAll(): void {
    if (this.difficulties().length > 0) return;

    this.difficultyFacade
      .loadAll()
      .pipe(
        tap(() => {
          this.setCurrentDifficultyByName('easy');
        }),
      )
      .subscribe();
  }
}
