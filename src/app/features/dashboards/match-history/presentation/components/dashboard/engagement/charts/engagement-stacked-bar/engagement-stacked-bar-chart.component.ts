import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EngagementDashboardData } from '../../../../../../data/dto/engagement-dashboard-data.dto';
import { formatDate } from '../../../../../../../../../shared/utils/date-format.utils';
import {
  getGreen,
  getRed,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-engagement-stacked-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './engagement-stacked-bar-chart.component.html',
})
export class EngagementStackedBarChartComponent implements OnInit {
  @Input({ required: true })
  data!: EngagementDashboardData[];

  chartData!: ChartConfiguration<'bar'>['data'];

  chartOptions: ChartOptions<'bar'> = {
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

            return [`Partidas: ${item.totalMatches}`, `Total Respostas: ${item.totalAnswers}`];
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
          label: 'Acertos',
          data: this.data.map((item) => item.totalCorrectAnswers),
          backgroundColor: getGreen(),
          borderColor: getGreen(1),
          borderWidth: 1,
        },
        {
          label: 'Erros',
          data: this.data.map((item) => item.totalErrors),
          backgroundColor: getRed(),
          borderColor: getRed(1),
          borderWidth: 1,
        },
      ],
    };
  }
}
