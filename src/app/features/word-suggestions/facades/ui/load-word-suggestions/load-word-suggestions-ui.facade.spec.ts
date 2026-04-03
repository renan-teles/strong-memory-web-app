import { TestBed } from '@angular/core/testing';

import { LoadWordSuggestionsUiFacade } from './load-word-suggestions-ui.facade';

describe('LoadWordSuggestionsUiFacade', () => {
  let service: LoadWordSuggestionsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordSuggestionsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
