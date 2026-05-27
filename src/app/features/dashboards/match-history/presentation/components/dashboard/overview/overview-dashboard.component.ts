import { Component, Input } from '@angular/core';

import { KpiCardDashboardComponent } from '../../../../../components/cards/kpi/kpi-card-dashboard.component';
import { CompactNumberPipe } from '../../../../../../../shared/ui/pipes/dashboard/compact-number-pipe';
import { PercentagePipe } from '../../../../../../../shared/ui/pipes/dashboard/percentage.pipe-pipe';
import { AnswersChartComponent } from './charts/answers/answers-chart.component';
import { TimeChartComponent } from './charts/time/time-chart.component';
import { AccuracyChartComponent } from './charts/accuracy/accuracy-chart.component';
import { MatchResultChartComponent } from './charts/match-result/match-result-chart.component';
import { OverviewDashboardData } from '../../../../data/dto/overview-dashboard-data.dto';

@Component({
  selector: 'app-overview-dashboard',
  imports: [
    KpiCardDashboardComponent,
    PercentagePipe,
    CompactNumberPipe,
    AnswersChartComponent,
    TimeChartComponent,
    AccuracyChartComponent,
    MatchResultChartComponent,
  ],
  templateUrl: './overview-dashboard.component.html',
  styleUrl: './overview-dashboard.component.css',
})
export class OverviewDashboardComponent {
  @Input({ required: true }) data!: OverviewDashboardData;
}
