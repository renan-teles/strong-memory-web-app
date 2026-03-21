import { TestBed } from '@angular/core/testing';

import { CrudPlayerUiFacade } from './crud-player-ui.facade';

describe('CrudPlayerUiFacade', () => {
  let service: CrudPlayerUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudPlayerUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
