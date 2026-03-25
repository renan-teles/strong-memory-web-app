import { Component, inject, Signal } from '@angular/core';
import { IWordData } from '../../../../words/models/word-data.interface';
import { WordsGameService } from '../../../services/words-game/words-game.service';
import { WordsGameFacade } from '../../../facades/game/words-game.facade';
import { WordComparatorDirective } from '../../../../../shared/directives/word-comparator.directive';
import { IWordsComparator } from '../../../models/words-comparator.interface';

@Component({
  selector: 'app-words-list',
  imports: [WordComparatorDirective],
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements IWordsComparator {
  private readonly service: WordsGameService = inject(WordsGameService);
  private readonly facade: WordsGameFacade = inject(WordsGameFacade);

  words: Signal<IWordData[]> = this.service.currentWords;
  compare: Signal<boolean> = this.facade.showResult;

  isEqualsWords(index: number): boolean {
    return this.service.compareCurrentWordsAndUserWordsByIndex(index);
  }
}
