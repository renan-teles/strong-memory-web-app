import { TestBed } from '@angular/core/testing';

import { CrudPlayerApiFacade } from './crud-player-api.facade';

describe('CrudPlayerApiFacade', () => {
  let service: CrudPlayerApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPlayerApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
