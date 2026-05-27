import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GameHighestScoreDashboardData } from '../../../../../../data/dto/game-highest-score-dashboard-data.dto';
import { formatDate } from '../../../../../../../../../shared/utils/date-format.utils';
import {
  getGreen,
  getRed,
  getYellow,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';
import { capitalizeWords } from '../../../../../../../../../shared/utils/string-format.utils';
import { translateMatchMode } from '../../../../../../../../../shared/utils/dashboard/dashboard.utils';

@Component({
  selector: 'app-score-history-scatter-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './score-history-scatter-chart.component.html',
})
export class ScoreHistoryScatterChartComponent implements OnInit {
  @Input({ required: true })
  data!: GameHighestScoreDashboardData[];

  chartData!: ChartConfiguration<'scatter'>['data'];

  chartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    showLine: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw as any;

            return [
              `Modo: ${point.matchMode}`,
              `Dificuldade: ${point.difficulty}`,
              `Score: ${point.y}`,
              `Data: ${point.formattedDate}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Datas',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };

  ngOnInit(): void {
    const easyData: any[] = this.mapDifficultyData('fácil');
    const mediumData: any[] = this.mapDifficultyData('normal');
    const hardData: any[] = this.mapDifficultyData('difícil');

    this.chartData = {
      datasets: [
        {
          label: 'Fácil',
          data: easyData,
          backgroundColor: getGreen(),
          pointRadius: 7,
        },
        {
          label: 'Normal',
          data: mediumData,
          backgroundColor: getYellow(),
          pointRadius: 7,
        },
        {
          label: 'Difícil',
          data: hardData,
          backgroundColor: getRed(),
          pointRadius: 7,
        },
      ],
    };
  }

  private mapDifficultyData(difficulty: string): any[] {
    return this.data
      .filter((item) => item.difficulty === difficulty)
      .map((item) => ({
        x: formatDate(item.matchDate),
        y: item.highestScore,
        difficulty: capitalizeWords(item.difficulty),
        matchMode: translateMatchMode(item.matchMode),
        formattedDate: formatDate(item.matchDate),
      }));
  }
}
