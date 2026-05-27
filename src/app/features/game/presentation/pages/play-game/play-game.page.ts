import { Component, computed, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { WordsGameCardComponent } from '../../components/cards/words-game/words-game-card.component';
import { NoTimeLeftComponent } from '../../components/no-time-left/no-time-left.component';
import { EndGameComponent } from '../../components/end-game/end-game.component';
import { ErrorComponent } from '../../../../../shared/ui/components/error/error.component';
import { LoadingContentComponent } from '../../../../../shared/ui/components/loading-content/loading-content.component';
import { GameApiFacade } from '../../state/game/api/game-api.facade';
import { CanComponentDeactivate } from '../../../../../core/guards/confirm-exit/confirm-exit-guard';
import { PlayGamePageFacade } from '../../state/pages/play-game-page.facade';
import { GameMatchService } from '../../../domain/services/game-match.service';
import { GameStatus } from '../../state/game/game-status.interface';
import { GameState } from '../../state/game/game-state.type';
import { ToastService } from '../../../../../shared/services/toast/toast.service';
import { AuthStateService } from '../../../../../core/services/auth/auth-state.service';

@Component({
  selector: 'app-play-game',
  imports: [
    WordsGameCardComponent,
    ErrorComponent,
    NoTimeLeftComponent,
    EndGameComponent,
    LoadingContentComponent,
  ],
  templateUrl: './play-game.page.html',
  styleUrl: './play-game.page.css',
})
export class PlayGamePage implements OnInit, OnDestroy, CanComponentDeactivate {
  private readonly pageFacade: PlayGamePageFacade = inject(PlayGamePageFacade);
  private readonly gameApi: GameApiFacade = inject(GameApiFacade);
  private readonly gameServie: GameMatchService = inject(GameMatchService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly authState: AuthStateService = inject(AuthStateService);

  private readonly gameStatus = signal<GameStatus>({ state: 'show-game', scoreAchieved: 0 });

  isValidParam = this.pageFacade.isValidParam;

  gameState: Signal<GameState> = computed(() => this.gameStatus().state);
  scoreAchieved: Signal<number> = computed(() => this.gameStatus().scoreAchieved);

  isStartingGame: Signal<boolean> = this.gameApi.isStarting;
  startingGameSuccess: Signal<boolean> = this.gameApi.startingSuccess;

  ngOnInit(): void {
    this.pageFacade.loadGameData();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  setState(state: any): void {
    this.gameStatus.set(state);
  }

  async canDeactivate(): Promise<boolean> {
    try {
      if (
        this.gameStatus().state === 'show-game' &&
        !this.gameServie.isGameOver() &&
        this.authState.isAuthenticated()
      ) {
        return await this.pageFacade.confirmLeave();
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
