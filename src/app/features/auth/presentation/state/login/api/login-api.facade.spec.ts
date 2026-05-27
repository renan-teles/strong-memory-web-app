import { TestBed } from '@angular/core/testing';

import { LoginApiFacade } from './login-api.facade';

describe('LoginApiFacade', () => {
  let service: LoginApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
