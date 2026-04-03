import { TestBed } from '@angular/core/testing';

import { AuthUsersFacade } from './auth-users.facade';

describe('AuthUsersFacade', () => {
  let service: AuthUsersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
