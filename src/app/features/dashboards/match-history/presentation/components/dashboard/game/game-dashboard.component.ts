import { Component, Input } from '@angular/core';
import { GameHighestScoreDashboardData } from '../../../../data/dto/game-highest-score-dashboard-data.dto';
import { GameModeDashboardData } from '../../../../data/dto/game-mode-dashboard-data.dto';
import { GameModePerformanceChartComponent } from './charts/game-mode-performance/game-mode-performance-chart.component';
import { GameModeRadarChartComponent } from './charts/game-mode-radar-chart/game-mode-radar-chart.component';
import { HighestScoreBarChartComponent } from './charts/highest-score-bar/highest-score-bar-chart.component';
import { ScoreHistoryScatterChartComponent } from './charts/score-history-scatter/score-history-scatter-chart.component';

@Component({
  selector: 'app-game-dashboard',
  imports: [
    HighestScoreBarChartComponent,
    ScoreHistoryScatterChartComponent,
    GameModePerformanceChartComponent,
    GameModeRadarChartComponent,
  ],
  templateUrl: './game-dashboard.component.html',
  styleUrl: './game-dashboard.component.css',
})
export class GameDashboardComponent {
  @Input({ required: true }) highestScores!: GameHighestScoreDashboardData[];
  @Input({ required: true }) gameModeData!: GameModeDashboardData[];
}
