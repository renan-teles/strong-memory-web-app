import { Component, inject, Signal } from '@angular/core';
import { WordComparatorDirective } from '../../../../../../shared/ui/directives/word-comparator.directive';
import { DrawnWordResponse } from '../../../../data/dto/response/drawn-word-response';
import { GameFacade } from '../../../state/game/game.facade';
import { GameMatchService } from '../../../../domain/services/game-match.service';
import { WordsComparator } from '../../../../domain/interfaces/words-comparator.interface';

@Component({
  selector: 'app-words-list',
  imports: [WordComparatorDirective],
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements WordsComparator {
  private readonly service: GameMatchService = inject(GameMatchService);
  private readonly facade: GameFacade = inject(GameFacade);

  compare: Signal<boolean> = this.facade.showResult;

  get words(): DrawnWordResponse[] {
    return this.service.getViewWords();
  }

  isEqualsWords(index: number): boolean {
    if (!this.compare()) return false;
    return this.service.isCorrectByIndex(index);
  }
}
