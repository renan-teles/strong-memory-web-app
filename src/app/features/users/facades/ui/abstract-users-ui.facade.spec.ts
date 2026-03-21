import { TestBed } from '@angular/core/testing';

import { AbstractUsersUiFacade } from './abstract-users-ui.facade';

describe('AbstractUsersUiFacade', () => {
  let service: AbstractUsersUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractUsersUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
