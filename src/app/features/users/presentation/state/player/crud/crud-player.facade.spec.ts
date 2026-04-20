import { TestBed } from '@angular/core/testing';

import { CrudPlayerFacade } from './crud-player.facade';

describe('CrudPlayerFacade', () => {
  let service: CrudPlayerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPlayerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
