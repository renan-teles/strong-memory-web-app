import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GameModeDashboardData } from '../../../../../../data/dto/game-mode-dashboard-data.dto';
import { capitalizeWords } from '../../../../../../../../../shared/utils/string-format.utils';
import {
  getGreen,
  getRed,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';
import { translateMatchMode } from '../../../../../../../../../shared/utils/dashboard/dashboard.utils';

@Component({
  selector: 'app-game-mode-performance-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './game-mode-performance-chart.component.html',
})
export class GameModePerformanceChartComponent implements OnInit {
  @Input({ required: true })
  data!: GameModeDashboardData[];

  chartData!: ChartConfiguration<'bar'>['data'];

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  ngOnInit(): void {
    const chartLabels: string[] = this.data.map((item) =>
      capitalizeWords(translateMatchMode(item.matchMode)),
    );

    this.chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Acertos',
          data: this.data.map((item) => item.totalCorrectAnswers),
          backgroundColor: getGreen(),
          borderColor: getGreen(1),
          borderWidth: 2,
        },
        {
          label: 'Erros',
          data: this.data.map((item) => item.totalErrors),
          backgroundColor: getRed(),
          borderColor: getRed(1),
          borderWidth: 2,
        },
      ],
    };
  }
}
