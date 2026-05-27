import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { formatDate } from '../../../../../../../../../shared/utils/date-format.utils';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { EngagementDashboardData } from '../../../../../../data/dto/engagement-dashboard-data.dto';
import {
  getBlue,
  getGreen,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-engagement-activity-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './engagement-activity-line-chart.component.html',
})
export class EngagementActivityLineChartComponent implements OnInit {
  @Input({ required: true })
  data!: EngagementDashboardData[];

  chartData!: ChartConfiguration<'line'>['data'];

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          footer: (items) => {
            const index = items[0].dataIndex;
            const item = this.data[index];

            return [`Partidas: ${item.totalMatches}`];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  ngOnInit(): void {
    this.chartData = {
      labels: this.data.map((item) => formatDate(item.activityDate)),

      datasets: [
        {
          label: 'Total de Respostas',
          data: this.data.map((item) => item.totalAnswers),
          borderColor: getBlue(1),
          backgroundColor: getBlue(0.2),
          pointBackgroundColor: getBlue(1),
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Total de Partidas',
          data: this.data.map((item) => item.totalMatches),
          borderColor: getGreen(1),
          backgroundColor: getGreen(0.15),
          pointBackgroundColor: getGreen(1),
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }
}
