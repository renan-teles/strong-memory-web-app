import { Component, Input } from '@angular/core';
import { EngagementDashboardData } from '../../../../data/dto/engagement-dashboard-data.dto';
import { EngagementStackedBarChartComponent } from './charts/engagement-stacked-bar/engagement-stacked-bar-chart.component';
import { EngagementActivityLineChartComponent } from './charts/engagement-activity-line/engagement-activity-line-chart.component';

@Component({
  selector: 'app-engagement-dashboard',
  imports: [EngagementStackedBarChartComponent, EngagementActivityLineChartComponent],
  templateUrl: './engagement-dashboard.component.html',
  styleUrl: './engagement-dashboard.component.css',
})
export class EngagementDashboardComponent {
  @Input({ required: true })
  data!: EngagementDashboardData[];
}
