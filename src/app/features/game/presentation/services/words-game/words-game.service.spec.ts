import { TestBed } from '@angular/core/testing';

import { WordsGameService } from './words-game.service';

describe('WordsGameService', () => {
  let service: WordsGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
