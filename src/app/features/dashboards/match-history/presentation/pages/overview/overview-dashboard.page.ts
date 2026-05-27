import { Component, inject, OnInit, Signal } from '@angular/core';
import { OverviewDashboardApiFacade } from '../../state/overview/overview-dashboard-api.facade';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { OverviewDashboardData } from '../../../data/dto/overview-dashboard-data.dto';
import { OverviewDashboardComponent } from '../../components/dashboard/overview/overview-dashboard.component';
import { LoadingContentComponent } from '../../../../../../shared/ui/components/loading-content/loading-content.component';

@Component({
  selector: 'app-overview-dashboard-page',
  imports: [OverviewDashboardComponent, LoadingContentComponent],
  templateUrl: './overview-dashboard.page.html',
  styleUrl: './overview-dashboard.page.css',
})
export class OverviewDashboardPage implements OnInit {
  private readonly overviewFacade: OverviewDashboardApiFacade = inject(OverviewDashboardApiFacade);

  isLoadingOverviewData: Signal<boolean> = this.overviewFacade.isLoadingOverviewData;
  loadingOverviewDataSuccess: Signal<boolean> = this.overviewFacade.loadingOverviewDataSuccess;
  data: Signal<OverviewDashboardData | null> = this.overviewFacade.overviewData;

  ngOnInit(): void {
    this.overviewFacade.loadOverviewData();
  }
}
