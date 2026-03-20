import { TestBed } from '@angular/core/testing';

import { WordSuggestionsUiFacade } from './word-suggestions-ui.facade.ts';

describe('WordSuggestionsUiFacade', () => {
  let service: WordSuggestionsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSuggestionsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
