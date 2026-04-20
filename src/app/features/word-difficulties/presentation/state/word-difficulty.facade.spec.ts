import { TestBed } from '@angular/core/testing';

import { WordDifficultyFacade } from './word-difficulty.facade';

describe('WordDifficultyFacade', () => {
  let service: WordDifficultyFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDifficultyFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
