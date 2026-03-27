import { TestBed } from '@angular/core/testing';

import { CrudWordsUiFacade } from './crud-words-ui.facade';

describe('CrudWordsUiFacade', () => {
  let service: CrudWordsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
