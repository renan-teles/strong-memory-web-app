import { TestBed } from '@angular/core/testing';

import { AbstractCrudUsersUiFacade } from './abstract-crud-users-ui.facade';

describe('AbstractCrudUsersUiFacade', () => {
  let service: AbstractCrudUsersUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractCrudUsersUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
