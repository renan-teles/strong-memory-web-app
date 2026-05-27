import { Component, Input, OnInit } from '@angular/core';

import { ChartConfiguration, ChartOptions } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import {
  msToSeconds,
  secondsToMinutesAndSeconds,
} from '../../../../../../../../../shared/utils/time-converter.utils';
import { GameModeDashboardData } from '../../../../../../data/dto/game-mode-dashboard-data.dto';
import { getModeColor } from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-game-mode-radar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './game-mode-radar-chart.component.html',
})
export class GameModeRadarChartComponent implements OnInit {
  @Input({ required: true })
  data!: GameModeDashboardData[];

  chartData!: ChartConfiguration<'radar'>['data'];

  private readonly chartDataLabels: string[] = [
    'Partidas',
    'Acertos',
    'Erros',
    'Precisão',
    'Tempo Médio',
    'Resposta Média',
  ];

  chartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as any;
            const label = context.label as string;

            if (label === this.chartDataLabels[3]) {
              return `${label}: ${value}%`;
            }

            if (label === this.chartDataLabels[4] || label === this.chartDataLabels[5]) {
              return `${label}: ${secondsToMinutesAndSeconds(Number(value))}`;
            }

            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  ngOnInit(): void {
    this.chartData = {
      labels: this.chartDataLabels,
      datasets: this.data.map((mode) => ({
        label: mode.matchMode,
        data: [
          mode.totalMatches,
          mode.totalCorrectAnswers,
          mode.totalErrors,
          mode.overallAccuracyPercentage,
          msToSeconds(mode.averageDurationMS),
          msToSeconds(mode.averageResponseTimeMS),
        ],
        backgroundColor: getModeColor(mode.matchMode, 0.2),
        borderColor: getModeColor(mode.matchMode, 1),
        borderWidth: 2,
        pointBackgroundColor: getModeColor(mode.matchMode, 1),
      })),
    };
  }
}
