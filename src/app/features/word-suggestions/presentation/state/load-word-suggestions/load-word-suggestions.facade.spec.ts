import { TestBed } from '@angular/core/testing';

import { LoadWordSuggestionsFacade } from './load-word-suggestions.facade';

describe('LoadWordSuggestionsFacade', () => {
  let service: LoadWordSuggestionsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordSuggestionsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
