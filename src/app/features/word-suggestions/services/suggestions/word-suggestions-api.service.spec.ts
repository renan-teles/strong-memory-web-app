import { TestBed } from '@angular/core/testing';

import { WordSuggestionsApiService } from './word-suggestions-api.service';

describe('WordSuggestionsApiService', () => {
  let service: WordSuggestionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSuggestionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
