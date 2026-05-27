import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { GameDashboardApiFacade } from '../../state/game/game-dashboard-api.facade';
import { GameHighestScoreDashboardData } from '../../../data/dto/game-highest-score-dashboard-data.dto';
import { GameDashboardComponent } from '../../components/dashboard/game/game-dashboard.component';
import { GameModeDashboardData } from '../../../data/dto/game-mode-dashboard-data.dto';
import { LoadingContentComponent } from '../../../../../../shared/ui/components/loading-content/loading-content.component';

@Component({
  selector: 'app-game-dashboard-page',
  imports: [LoadingContentComponent, GameDashboardComponent],
  templateUrl: './game-dashboard.page.html',
  styleUrl: './game-dashboard.page.css',
})
export class GameDashboardPage implements OnInit {
  private readonly gameFacade: GameDashboardApiFacade = inject(GameDashboardApiFacade);

  isLoadingHighestScoresData: Signal<boolean> = this.gameFacade.isLoadingHighestScoresData;
  loadingHighestScoresSuccess: Signal<boolean> = this.gameFacade.loadingHighestScoresSuccess;
  highestScoresData: Signal<GameHighestScoreDashboardData[]> = this.gameFacade.highestScoresData;

  isLoadingGameModeData: Signal<boolean> = this.gameFacade.isLoadingGameModeData;
  loadingGameModeDataSuccess: Signal<boolean> = this.gameFacade.loadingGameModeDataSuccess;
  gameModeData: Signal<GameModeDashboardData[]> = this.gameFacade.gameModeData;

  isLoading: Signal<boolean> = computed(
    () => this.isLoadingGameModeData() || this.isLoadingHighestScoresData(),
  );
  success: Signal<boolean> = computed(
    () => this.loadingGameModeDataSuccess() || this.loadingHighestScoresSuccess(),
  );

  ngOnInit(): void {
    this.gameFacade.loadHighestScoresData();
    this.gameFacade.loadGameModeData();
  }
}
