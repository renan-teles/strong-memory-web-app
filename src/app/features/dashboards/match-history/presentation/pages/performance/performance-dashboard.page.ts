import { Component, computed, inject, Signal } from '@angular/core';
import { PerformanceDashboardApiFacade } from '../../state/performance/performance-dashboard-api.facade';
import { AccuracyTimelineDashboardData } from '../../../data/dto/accuracy-timeline-dashboard-data.dto';
import { LoadingContentComponent } from '../../../../../../shared/ui/components/loading-content/loading-content.component';
import { PerformanceDashboardComponent } from '../../components/dashboard/performance/performance-dashboard.component';

@Component({
  selector: 'app-performance-dashboard-page',
  imports: [LoadingContentComponent, PerformanceDashboardComponent],
  templateUrl: './performance-dashboard.page.html',
  styleUrl: './performance-dashboard.page.css',
})
export class PerformanceDashboardPage {
  private readonly performanceFacade: PerformanceDashboardApiFacade = inject(
    PerformanceDashboardApiFacade,
  );

  isLoading: Signal<boolean> = computed(() => this.isLoadingAccuracyTimelineData());
  success: Signal<boolean> = computed(() => this.loadingAccuracyTimelineDataSuccess());

  isLoadingAccuracyTimelineData: Signal<boolean> =
    this.performanceFacade.isLoadingAccuracyTimelineData;

  loadingAccuracyTimelineDataSuccess: Signal<boolean> =
    this.performanceFacade.loadingAccuracyTimelineDataSuccess;

  accuracyTimelineData: Signal<AccuracyTimelineDashboardData[]> =
    this.performanceFacade.accuracyTimelineData;

  ngOnInit(): void {
    this.performanceFacade.loadPerformanceAccuracyTimeline();
  }
}
