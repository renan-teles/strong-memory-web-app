import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { OverviewDashboardData } from '../../../data/dto/overview-dashboard-data.dto';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../../shared/utils/request-state.utils';
import { MatchHistoryDashboardApiService } from '../../../data/services/api/match-history-dashboard-api.service';

@Injectable({
  providedIn: 'root',
})
export class OverviewDashboardApiFacade {
  private readonly api: MatchHistoryDashboardApiService = inject(MatchHistoryDashboardApiService);

  private readonly _overviewState = signal<RequestState<OverviewDashboardData | null>>({
    status: 'idle',
    data: null,
  });

  readonly overviewData: Signal<OverviewDashboardData | null> = computed(
    () => this._overviewState().data!,
  );

  readonly isLoadingOverviewData: Signal<boolean> = computed(
    () => this._overviewState().status === 'loading',
  );

  readonly loadingOverviewDataSuccess: Signal<boolean> = computed(
    () => this._overviewState().status === 'success',
  );

  loadOverviewData(): void {
    setRequestState(this._overviewState, 'loading', null);

    this.api
      .loadOverviewData()
      .pipe(
        tap((response: ApiResponse<OverviewDashboardData>) => {
          setRequestState(this._overviewState, 'success', response.data!);
        }),
        catchError(() => {
          setStatusRequestState(this._overviewState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
