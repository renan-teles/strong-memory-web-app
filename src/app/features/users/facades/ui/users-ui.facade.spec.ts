import { TestBed } from '@angular/core/testing';

import { UsersUiFacade } from './users-ui.facade';

describe('UsersUiFacade', () => {
  let service: UsersUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
