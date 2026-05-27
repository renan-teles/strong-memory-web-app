import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractApiService } from '../../../../../../core/services/api/abstract-api.service';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { OverviewDashboardData } from '../../dto/overview-dashboard-data.dto';
import { GameHighestScoreDashboardData } from '../../dto/game-highest-score-dashboard-data.dto';
import { GameModeDashboardData } from '../../dto/game-mode-dashboard-data.dto';
import { AccuracyTimelineDashboardData } from '../../dto/accuracy-timeline-dashboard-data.dto';
import { EngagementDashboardData } from '../../dto/engagement-dashboard-data.dto';

@Injectable({
  providedIn: 'root',
})
export class MatchHistoryDashboardApiService extends AbstractApiService {
  private readonly LOCAL_URL: string = `${this.BASE_URL}/dashboard/match-history`;

  /* OVERVIEW */
  loadOverviewData(): Observable<ApiResponse<OverviewDashboardData>> {
    return this.http.get<ApiResponse<OverviewDashboardData>>(`${this.LOCAL_URL}/overview`);
  }

  /* GAME */
  loadGameHighestScoresData(): Observable<ApiResponse<GameHighestScoreDashboardData[]>> {
    return this.http.get<ApiResponse<GameHighestScoreDashboardData[]>>(
      `${this.LOCAL_URL}/game/highest-scores`,
    );
  }

  loadGameModeData(): Observable<ApiResponse<GameModeDashboardData[]>> {
    return this.http.get<ApiResponse<GameModeDashboardData[]>>(`${this.LOCAL_URL}/game/modes`);
  }

  /* PERFORMANCE */
  loadPerformanceAccuracyTimelineData(
    days: number = 5,
  ): Observable<ApiResponse<AccuracyTimelineDashboardData[]>> {
    return this.http.get<ApiResponse<AccuracyTimelineDashboardData[]>>(
      `${this.LOCAL_URL}/performance/accuracy`,
      {
        params: {
          days,
        },
      },
    );
  }

  /* ENGAGEMENT */
  loadEngagementData(days: number = 5): Observable<ApiResponse<EngagementDashboardData[]>> {
    return this.http.get<ApiResponse<EngagementDashboardData[]>>(`${this.LOCAL_URL}/engagement`, {
      params: { days },
    });
  }
}
