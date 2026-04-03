import { TestBed } from '@angular/core/testing';

import { AuthUsersUiFacade } from './auth-users-ui.facade';

describe('AuthUsersUiFacade', () => {
  let service: AuthUsersUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsersUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
