import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUsersUiFacade } from '../abstract-users-ui.facade';
import { IApiResponse } from '../../../../../shared/models/api-response.interface';
import { IUserScoreRecord } from '../../../models/user-score-record.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { IFindState } from '../../../../../shared/models/find.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerScoreRecordsUiFacade extends AbstractUsersUiFacade {
  constructor() {
    super();
  }

  readonly _findScoreRecordState = signal<IFindState<IUserScoreRecord[]>>({
    isFinding: false,
    values: [],
    findSuccess: false,
  });

  readonly scores: Signal<IUserScoreRecord[]> = computed(() => {
    return this._findScoreRecordState().values;
  });

  readonly isFinding: Signal<boolean> = computed(() => {
    return this._findScoreRecordState().isFinding;
  });

  readonly findSuccess: Signal<boolean> = computed(() => {
    return this._findScoreRecordState().findSuccess;
  });

  getSocreRecords(): void {
    this._findScoreRecordState.update((s) => ({
      ...s,
      isFinding: true,
      findSuccess: false,
      values: [],
    }));

    this.facade
      .getPlayerSocreRecords()
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord[]>) => {
          this._findScoreRecordState.update((s) => ({
            ...s,
            values: response.data!,
            findSuccess: true,
          }));
        }),
        catchError(() => {
          this._findScoreRecordState.update((s) => ({
            ...s,
            findSuccess: false,
          }));
          return EMPTY;
        }),
        finalize(() => {
          this._findScoreRecordState.update((s) => ({
            ...s,
            isFinding: false,
          }));
        }),
      )
      .subscribe();
  }
}
