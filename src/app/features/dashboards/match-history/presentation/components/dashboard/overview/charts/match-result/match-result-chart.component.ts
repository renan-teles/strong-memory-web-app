import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-match-result-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './match-result-chart.component.html',
  styleUrl: './match-result-chart.component.css',
})
export class MatchResultChartComponent implements OnInit {
  @Input({ required: true })
  completedPercentage!: number;

  @Input({ required: true })
  gameOverPercentage!: number;

  @Input({ required: true })
  timeoutPercentage!: number;

  @Input({ required: true })
  gaveUpPercentage!: number;

  chartData!: ChartConfiguration<'pie'>['data'];

  chartOptions: ChartOptions<'pie'> = {
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
    this.chartData = {
      labels: ['Completadas', 'Game Over', 'Timeout', 'Desistência'],
      datasets: [
        {
          data: [
            this.completedPercentage,
            this.gameOverPercentage,
            this.timeoutPercentage,
            this.gaveUpPercentage,
          ],
        },
      ],
    };
  }
}
