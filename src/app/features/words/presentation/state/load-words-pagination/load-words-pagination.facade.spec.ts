import { TestBed } from '@angular/core/testing';

import { LoadWordsPaginationFacade } from './load-words-pagination.facade';

describe('LoadWordsPaginationFacade', () => {
  let service: LoadWordsPaginationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordsPaginationFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
