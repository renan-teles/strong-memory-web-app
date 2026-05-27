import { TestBed } from '@angular/core/testing';

import { RegisterApiFacade } from './register-api.facade';

describe('RegisterApiFacade', () => {
  let service: RegisterApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
