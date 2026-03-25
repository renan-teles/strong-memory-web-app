import { TestBed } from '@angular/core/testing';

import { WordsGameFacade } from './words-game.facade';

describe('WordsGameFacade', () => {
  let service: WordsGameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsGameFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
