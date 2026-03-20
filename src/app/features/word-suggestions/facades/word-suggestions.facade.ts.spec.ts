import { TestBed } from '@angular/core/testing';

import { WordSuggestionsFacade } from './word-suggestions.facade.ts';

describe('WordSuggestionsFacade', () => {
  let service: WordSuggestionsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSuggestionsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
