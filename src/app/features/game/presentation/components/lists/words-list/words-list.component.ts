import { Component, inject, Signal } from '@angular/core';
import { WordsGameService } from '../../../services/words-game/words-game.service';
import { WordsGameFacade } from '../../../state/game/words-game.facade';
import { WordComparatorDirective } from '../../../../../../shared/ui/directives/word-comparator.directive';
import { WordsComparator } from '../../../../domain/interfaces/words-comparator.interface';
import { WordResponse } from '../../../../../words/data/dto/response/word-response';

@Component({
  selector: 'app-words-list',
  imports: [WordComparatorDirective],
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements WordsComparator {
  private readonly service: WordsGameService = inject(WordsGameService);
  private readonly facade: WordsGameFacade = inject(WordsGameFacade);

  words: Signal<WordResponse[]> = this.service.currentWords;
  compare: Signal<boolean> = this.facade.showResult;

  isEqualsWords(index: number): boolean {
    if (!this.compare()) return false;
    return this.service.compareCurrentWordsAndUserWordsByIndex(index);
  }
}
