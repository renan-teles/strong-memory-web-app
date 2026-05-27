import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatchHistoryDashboardApiService } from '../../../data/services/api/match-history-dashboard-api.service';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { setRequestState } from '../../../../../../shared/utils/request-state.utils';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { catchError, EMPTY, tap } from 'rxjs';
import { EngagementDashboardData } from '../../../data/dto/engagement-dashboard-data.dto';

@Injectable({
  providedIn: 'root',
})
export class EngagementDashboardApiFacade {
  private readonly api: MatchHistoryDashboardApiService = inject(MatchHistoryDashboardApiService);

  private readonly _engagementState = signal<RequestState<EngagementDashboardData[]>>({
    status: 'idle',
    data: [],
  });

  readonly engagementData: Signal<EngagementDashboardData[]> = computed(
    () => this._engagementState().data!,
  );

  readonly isLoadingEngagementData: Signal<boolean> = computed(
    () => this._engagementState().status === 'loading',
  );

  readonly loadingEngagementDataSuccess: Signal<boolean> = computed(
    () => this._engagementState().status === 'success',
  );

  loadEngagementData(days: number = 5): void {
    setRequestState(this._engagementState, 'loading', []);

    this.api
      .loadEngagementData(days)
      .pipe(
        tap((response: ApiResponse<EngagementDashboardData[]>) => {
          setRequestState(this._engagementState, 'success', response.data!);
        }),
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
