import { TestBed } from '@angular/core/testing';

import { FindWordsPaginationUiFacade } from './find-words-pagination-ui.facade';

describe('FindWordsPaginationUiFacade', () => {
  let service: FindWordsPaginationUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindWordsPaginationUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
