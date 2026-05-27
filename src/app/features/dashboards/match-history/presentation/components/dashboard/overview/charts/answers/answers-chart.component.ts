import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  getGreen,
  getRed,
} from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-answers-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './answers-chart.component.html',
})
export class AnswersChartComponent implements OnInit {
  @Input({ required: true })
  totalCorrectAnswers!: number;

  @Input({ required: true })
  totalErrors!: number;

  chartData!: ChartConfiguration<'bar'>['data'];

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  ngOnInit(): void {
    this.chartData = {
      labels: ['Acertos', 'Erros'],
      datasets: [
        {
          data: [this.totalCorrectAnswers, this.totalErrors],
          label: 'Respostas',
          backgroundColor: [getGreen(), getRed()],
        },
      ],
    };
  }
}
