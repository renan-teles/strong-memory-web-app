import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatchHistoryDashboardApiService } from '../../../data/services/api/match-history-dashboard-api.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { AccuracyTimelineDashboardData } from '../../../data/dto/accuracy-timeline-dashboard-data.dto';
import { setRequestState } from '../../../../../../shared/utils/request-state.utils';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PerformanceDashboardApiFacade {
  private readonly api: MatchHistoryDashboardApiService = inject(MatchHistoryDashboardApiService);

  private readonly _accuracyTimelineState = signal<RequestState<AccuracyTimelineDashboardData[]>>({
    status: 'idle',
    data: [],
  });

  readonly accuracyTimelineData: Signal<AccuracyTimelineDashboardData[]> = computed(
    () => this._accuracyTimelineState().data!,
  );

  readonly isLoadingAccuracyTimelineData: Signal<boolean> = computed(
    () => this._accuracyTimelineState().status === 'loading',
  );

  readonly loadingAccuracyTimelineDataSuccess: Signal<boolean> = computed(
    () => this._accuracyTimelineState().status === 'success',
  );

  loadPerformanceAccuracyTimeline(days: number = 5): void {
    setRequestState(this._accuracyTimelineState, 'loading', []);

    this.api
      .loadPerformanceAccuracyTimelineData(days)
      .pipe(
        tap((response: ApiResponse<AccuracyTimelineDashboardData[]>) => {
          setRequestState(this._accuracyTimelineState, 'success', response.data!);
        }),
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
