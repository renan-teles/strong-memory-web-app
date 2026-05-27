import { Component, computed, inject, Signal } from '@angular/core';
import { EngagementDashboardApiFacade } from '../../state/engagement/engagement-dashboard-api.facade';
import { EngagementDashboardData } from '../../../data/dto/engagement-dashboard-data.dto';
import { EngagementDashboardComponent } from '../../components/dashboard/engagement/engagement-dashboard.component';
import { LoadingContentComponent } from '../../../../../../shared/ui/components/loading-content/loading-content.component';

@Component({
  selector: 'app-engagement-dashboard-page',
  imports: [EngagementDashboardComponent, LoadingContentComponent],
  templateUrl: './engagement-dashboard.page.html',
  styleUrl: './engagement-dashboard.page.css',
})
export class EngagementDashboardPage {
  private readonly engagementFacade: EngagementDashboardApiFacade = inject(
    EngagementDashboardApiFacade,
  );

  isLoading: Signal<boolean> = computed(() => this.isLoadingEngagementData());
  success: Signal<boolean> = computed(() => this.loadingEngagementDataSuccess());

  isLoadingEngagementData: Signal<boolean> = this.engagementFacade.isLoadingEngagementData;

  loadingEngagementDataSuccess: Signal<boolean> =
    this.engagementFacade.loadingEngagementDataSuccess;

  engagementData: Signal<EngagementDashboardData[]> = this.engagementFacade.engagementData;

  ngOnInit(): void {
    this.engagementFacade.loadEngagementData();
  }
}
