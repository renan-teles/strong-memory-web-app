import { TestBed } from '@angular/core/testing';

import { LoadWordsPaginationApiFacade } from './load-words-pagination-api.facade';

describe('LoadWordsPaginationApiFacade', () => {
  let service: LoadWordsPaginationApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordsPaginationApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
