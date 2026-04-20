import { TestBed } from '@angular/core/testing';

import { LoginFacade } from './login.facade';

describe('LoginFacade', () => {
  let service: LoginFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
