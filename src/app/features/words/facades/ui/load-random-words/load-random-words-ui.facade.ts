import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { WordsFacade } from '../../words.facade';
import { IWordData } from '../../../models/word-data.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { ILoadDataState } from '../../../../../shared/models/load-data-state.interface';

@Injectable({
  providedIn: 'root',
})
export class LoadRandomWordsUiFacade {
  private readonly facade: WordsFacade = inject(WordsFacade);

  private readonly _loadState = signal<ILoadDataState<IWordData[]>>({
    values: [],
    isLoading: false,
    success: false,
  });

  randomWords: Signal<IWordData[]> = computed(() => this._loadState().values);
  isLoading: Signal<boolean> = computed(() => this._loadState().isLoading);
  success: Signal<boolean> = computed(() => this._loadState().success);

  loadRandom(data: IWordDifficultyData): void {
    this._loadState.update((s) => ({
      ...s,
      values: [],
      isLoading: true,
      success: false,
    }));

    this.facade
      .loadRandomWords(data)
      .pipe(
        tap((response: IApiResponse<IWordData[]>) => {
          this._loadState.update((s) => ({
            ...s,
            values: response.data!,
            success: true,
          }));
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
