import { Component, inject, Output } from '@angular/core';
import { WordsGameFacade } from '../../facades/game/words-game.facade';

@Component({
  selector: 'app-no-time-left',
  imports: [],
  templateUrl: './no-time-left.component.html',
  styleUrl: './no-time-left.component.css',
})
export class NoTimeLeftComponent {
  private readonly facade: WordsGameFacade = inject(WordsGameFacade);

  @Output() gameState = this.facade.gameState;

  restartGame(): void {
    this.facade.resetGame();
  }
}
