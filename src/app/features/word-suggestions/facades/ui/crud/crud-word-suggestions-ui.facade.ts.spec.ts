import { TestBed } from '@angular/core/testing';

import { CrudWordSuggestionsUiFacade } from './crud-word-suggestions-ui.facade.ts.js';

describe('CrudWordSuggestionsUiFacade', () => {
  let service: CrudWordSuggestionsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordSuggestionsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
