import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  secondsToMinutesAndSeconds,
  msToSeconds,
} from '../../../../../../../../../shared/utils/time-converter.utils';

@Component({
  selector: 'app-time-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './time-chart.component.html',
})
export class TimeChartComponent implements OnInit {
  @Input({ required: true })
  averageResponseTimeMS!: number;

  @Input({ required: true })
  averageMatchDurationMS!: number;

  chartData!: ChartConfiguration<'bar'>['data'];
  private readonly chartDataLabels: string[] = ['Tempo de Resposta', 'Duração da Partida'];

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;

            if (context.label === this.chartDataLabels[0]) {
              return `${context.label}: ${value}s`;
            }
            return `${context.label}: ${secondsToMinutesAndSeconds(value)}`;
          },
        },
      },
    },
  };

  ngOnInit(): void {
    const averageResponseTimeMS: number = msToSeconds(this.averageResponseTimeMS);
    const averageMatchDurationMS: number = msToSeconds(this.averageMatchDurationMS);

    this.chartData = {
      labels: this.chartDataLabels,
      datasets: [
        {
          data: [averageResponseTimeMS, averageMatchDurationMS],
          label: 'Tempo Médio',
        },
      ],
    };
  }
}
