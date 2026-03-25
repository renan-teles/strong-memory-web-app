import { TestBed } from '@angular/core/testing';

import { WordDifficultService } from './word-difficult.service';

describe('WordDifficultService', () => {
  let service: WordDifficultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDifficultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
