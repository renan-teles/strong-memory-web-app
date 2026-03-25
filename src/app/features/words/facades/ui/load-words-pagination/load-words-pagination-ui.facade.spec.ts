import { TestBed } from '@angular/core/testing';

import { LoadWordsPaginationUiFacade } from './load-words-pagination-ui.facade';

describe('LoadWordsPaginationUiFacade', () => {
  let service: LoadWordsPaginationUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordsPaginationUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
