import { TestBed } from '@angular/core/testing';

import { WordDifficultyApiService } from './word-difficulty-api.service';

describe('WordDifficultyApiService', () => {
  let service: WordDifficultyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDifficultyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
