import { TestBed } from '@angular/core/testing';

import { CrudWordSuggestionsApiFacade } from './crud-word-suggestions-api.facade';

describe('CrudWordSuggestionsApiFacade', () => {
  let service: CrudWordSuggestionsApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordSuggestionsApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
