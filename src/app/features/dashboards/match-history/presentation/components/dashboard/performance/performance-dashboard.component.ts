import { Component, Input } from '@angular/core';
import { AccuracyTimelineDashboardData } from '../../../../data/dto/accuracy-timeline-dashboard-data.dto';
import { AccuracyTimelineChartComponent } from './charts/accuracy-timeline/accuracy-timeline-chart.component';
import { AccuracyStackedAreaChartComponent } from './charts/accuracy-stacked-area/accuracy-stacked-area-chart.component';

@Component({
  selector: 'app-performance-dashboard',
  imports: [AccuracyTimelineChartComponent, AccuracyStackedAreaChartComponent],
  templateUrl: './performance-dashboard.component.html',
  styleUrl: './performance-dashboard.component.css',
})
export class PerformanceDashboardComponent {
  @Input({ required: true })
  accuracyTimelineData!: AccuracyTimelineDashboardData[];
}
