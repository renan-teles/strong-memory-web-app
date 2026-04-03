import { TestBed } from '@angular/core/testing';

import { WordDifficultyService } from './word-difficulty.service';

describe('WordDifficultyService', () => {
  let service: WordDifficultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDifficultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
