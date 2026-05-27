import { TestBed } from '@angular/core/testing';

import { LoadWordSuggestionsApiFacade } from './load-word-suggestions-api.facade';

describe('LoadWordSuggestionsApiFacade', () => {
  let service: LoadWordSuggestionsApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordSuggestionsApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
