import { TestBed } from '@angular/core/testing';

import { CrudWordsFacade } from './crud-words.facade';

describe('CrudWordsFacade', () => {
  let service: CrudWordsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudWordsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
