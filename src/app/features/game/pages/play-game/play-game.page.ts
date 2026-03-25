import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { WordsGameCardComponent } from '../../components/cards/words-game/words-game-card.component';
import { LoadingRandomWordsComponent } from '../../components/loading-random-words/loading-random-words.component';
import { ErrorGameComponent } from '../../components/error-game/error-game.component';
import { NoTimeLeftComponent } from '../../components/no-time-left/no-time-left.component';
import { EndGameComponent } from '../../components/end-game/end-game.component';
import { GameState } from '../../types/game-state.type';
import { PlayGameUiFacade } from '../../facades/ui/play-game/play-game-page.facade';

@Component({
  selector: 'app-play-game',
  imports: [
    WordsGameCardComponent,
    LoadingRandomWordsComponent,
    ErrorGameComponent,
    NoTimeLeftComponent,
    EndGameComponent,
  ],
  templateUrl: './play-game.page.html',
  styleUrl: './play-game.page.css',
})
export class PlayGamePage implements OnInit {
  private readonly facade: PlayGameUiFacade = inject(PlayGameUiFacade);

  loadingWords: Signal<boolean> = this.facade.loadingRandomWords;
  loadingWordsSuccess: Signal<boolean> = this.facade.loadingRandomWordsSuccess;

  readonly gameState = signal<GameState>('show-game');

  ngOnInit(): void {
    this.facade.loadRandomWords();
  }

  setState(state: GameState): void {
    this.gameState.set(state);
  }
}
