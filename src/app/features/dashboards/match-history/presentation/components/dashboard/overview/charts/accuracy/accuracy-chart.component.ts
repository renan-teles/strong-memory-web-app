import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  getGreen,
  getRed,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-accuracy-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './accuracy-chart.component.html',
})
export class AccuracyChartComponent implements OnInit {
  @Input({ required: true })
  accuracyPercentage!: number;

  chartData!: ChartConfiguration<'doughnut'>['data'];

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  ngOnInit(): void {
    const errors: number = this.accuracyPercentage > 0 ? 100 - this.accuracyPercentage : 0;

    this.chartData = {
      labels: ['Precisão', 'Erros'],
      datasets: [
        {
          data: [this.accuracyPercentage, errors],
          backgroundColor: [getGreen(), getRed()],
        },
      ],
    };
  }
}
