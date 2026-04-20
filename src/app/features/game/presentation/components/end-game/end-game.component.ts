import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordsGameFacade } from '../../state/game/words-game.facade';

@Component({
  selector: 'app-end-game',
  imports: [RouterLink],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css',
})
export class EndGameComponent {
  private readonly facade: WordsGameFacade = inject(WordsGameFacade);
  score: Signal<number> = this.facade.score;
}
