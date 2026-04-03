import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { IWordDifficultyData } from '../../../shared/models/word-difficulty-data.interface';
import { WordDifficultyApiService } from '../word-difficulty-api/word-difficulty-api.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ILoadDataState } from '../../../shared/models/load-data-state.interface';
import { IApiResponse } from '../../../shared/models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyService {
  private readonly api: WordDifficultyApiService = inject(WordDifficultyApiService);

  private readonly _loadState = signal<ILoadDataState<IWordDifficultyData[]>>({
    values: [],
    isLoading: false,
    success: false,
  });

  readonly difficulties: Signal<IWordDifficultyData[]> = computed(() => this._loadState().values);
  readonly isLoading: Signal<boolean> = computed(() => this._loadState().isLoading);
  readonly loadingSuccess: Signal<boolean> = computed(() => this._loadState().success);

  currentDifficulty: IWordDifficultyData | null = null;

  getDifficultByName(name: string): IWordDifficultyData | undefined {
    return this.difficulties().find((d) => d.difficulty === name);
  }

  setCurrentDifficulty(diff: IWordDifficultyData): void {
    this.currentDifficulty = diff;
  }

  setCurrentDifficultyByName(difficultyName: string): void {
    const difficulty: IWordDifficultyData | undefined = this.getDifficultByName(difficultyName);
    if (!difficulty) return;

    this.currentDifficulty = difficulty;
  }

  loadAllDifficulties() {
    if (this.difficulties().length > 0) return;

    this._loadState.update((s) => ({
      ...s,
      values: [],
      isLoading: true,
      success: false,
    }));

    this.api
      .loadAll()
      .pipe(
        tap((response: IApiResponse<IWordDifficultyData[]>) => {
          this._loadState.update((s) => ({
            ...s,
            values: response.data!,
            success: true,
          }));

          this.setCurrentDifficultyByName('easy');
        }),
        catchError(() => {
          this._loadState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._loadState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }
}
