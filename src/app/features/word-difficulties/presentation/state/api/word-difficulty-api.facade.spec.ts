import { TestBed } from '@angular/core/testing';

import { WordDifficultyApiFacade } from './word-difficulty-api.facade';

describe('WordDifficultyApiFacade', () => {
  let service: WordDifficultyApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDifficultyApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
