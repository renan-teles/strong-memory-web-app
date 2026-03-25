import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUsersUiFacade } from '../abstract-users-ui.facade';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IUserScoreRecord } from '../../../models/user-score-record.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { ILoadDataState } from '../../../../../shared/models/load-data-state.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerScoreRecordsUiFacade extends AbstractUsersUiFacade {
  constructor() {
    super();
  }

  readonly _loadScoreRecordState = signal<ILoadDataState<IUserScoreRecord[]>>({
    isLoading: false,
    values: [],
    success: false,
  });

  readonly scores: Signal<IUserScoreRecord[]> = computed(() => {
    return this._loadScoreRecordState().values;
  });

  readonly isLoading: Signal<boolean> = computed(() => {
    return this._loadScoreRecordState().isLoading;
  });

  readonly loadSuccess: Signal<boolean> = computed(() => {
    return this._loadScoreRecordState().success;
  });

  loadSocreRecords(): void {
    this._loadScoreRecordState.update((s) => ({
      ...s,
      isLoading: true,
      success: false,
      values: [],
    }));

    this.facade
      .loadPlayerSocreRecords()
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord[]>) => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            values: response.data!,
            success: true,
          }));
        }),
        catchError(() => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            success: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._loadScoreRecordState.update((s) => ({
            ...s,
            isLoading: false,
          }));
        }),
      )
      .subscribe();
  }
}
