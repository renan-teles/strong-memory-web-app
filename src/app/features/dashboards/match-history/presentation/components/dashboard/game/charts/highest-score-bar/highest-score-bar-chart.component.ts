import { Component, Input, OnInit } from '@angular/core';
import { GameHighestScoreDashboardData } from '../../../../../../data/dto/game-highest-score-dashboard-data.dto';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { capitalizeWords } from '../../../../../../../../../shared/utils/string-format.utils';
import { translateMatchMode } from '../../../../../../../../../shared/utils/dashboard/dashboard.utils';
import { getDifficultyColor } from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-highest-score-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './highest-score-bar-chart.component.html',
  styleUrl: './highest-score-bar-chart.component.css',
})
export class HighestScoreBarChartComponent implements OnInit {
  @Input({ required: true })
  data!: GameHighestScoreDashboardData[];

  chartData!: ChartConfiguration<'bar'>['data'];

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Score: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
  };

  ngOnInit(): void {
    const sortedData: GameHighestScoreDashboardData[] = [...this.data].sort(
      (a, b) => b.highestScore - a.highestScore,
    );

    this.chartData = {
      labels: sortedData.map((item) => this.formatChartLabels(item)),
      datasets: [
        {
          data: sortedData.map((item) => item.highestScore),
          label: 'Maior Pontuação',
          backgroundColor: sortedData.map((item) => getDifficultyColor(item.difficulty)),
        },
      ],
    };
  }

  private formatChartLabels(item: GameHighestScoreDashboardData): string {
    const difficulty: string = capitalizeWords(item.difficulty);
    const mode: string = capitalizeWords(translateMatchMode(item.matchMode));
    return `${difficulty} - ${mode}`;
  }
}
