import { TestBed } from '@angular/core/testing';

import { CrudWordSuggestionsFacade } from './crud-word-suggestions.facade';

describe('CrudWordSuggestionsFacade', () => {
  let service: CrudWordSuggestionsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordSuggestionsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
