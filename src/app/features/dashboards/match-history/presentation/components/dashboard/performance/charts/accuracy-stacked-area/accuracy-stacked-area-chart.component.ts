import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AccuracyTimelineDashboardData } from '../../../../../../data/dto/accuracy-timeline-dashboard-data.dto';
import { groupDataBy } from '../../../../../../../../../shared/utils/dashboard/dashboard.utils';
import { formatDate } from '../../../../../../../../../shared/utils/date-format.utils';
import { getModeColor } from '../../../../../../../../../shared/utils/dashboard/chart-color.utils';

@Component({
  selector: 'app-accuracy-stacked-area-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './accuracy-stacked-area-chart.component.html',
})
export class AccuracyStackedAreaChartComponent implements OnInit {
  @Input({ required: true })
  data!: AccuracyTimelineDashboardData[];

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
          label: (context) => {
            const dataset = context.dataset as any;
            const metadata = dataset.metadata[context.dataIndex];
            const value = context.raw as number;

            return [
              `Modo: ${dataset.label}`,
              `Precisão: ${value}%`,
              `Partidas: ${metadata.totalMatches}`,
              `Acertos: ${metadata.totalCorrectAnswers}`,
              `Erros: ${metadata.totalErrors}`,
              `Precisão Média: ${metadata.averageAccuracyPercentage}%`,
            ];
          },
        },
      },
    },

    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Datas',
        },
      },

      y: {
        stacked: true,

        beginAtZero: true,

        max: 100,

        ticks: {
          callback: (value) => `${value}%`,
        },

        title: {
          display: true,

          text: 'Precisão (%)',
        },
      },
    },
  };

  ngOnInit(): void {
    const groupedModes = groupDataBy(this.data, (item) => item.matchMode);
    const labels = [...new Set(this.data.map((item) => formatDate(item.matchDate)))];

    this.chartData = {
      labels,

      datasets: Object.entries(groupedModes).map(
        ([mode, values]) =>
          ({
            label: mode,
            data: values.map((item) => item.overallAccuracyPercentage),
            metadata: values,
            borderColor: getModeColor(mode, 1),
            backgroundColor: getModeColor(mode, 0.35),
            pointBackgroundColor: getModeColor(mode, 1),
            pointRadius: 4,
            pointHoverRadius: 7,
            borderWidth: 2,
            fill: true,
            tension: 0.35,
          }) as any,
      ),
    };
  }
}
