import { TestBed } from '@angular/core/testing';

import { CrudWordsApiFacade } from './crud-words-api.facade';

describe('CrudWordsApiFacade', () => {
  let service: CrudWordsApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordsApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
