import { TestBed } from '@angular/core/testing';

import { RegisterFacade } from './register.facade';

describe('RegisterFacade', () => {
  let service: RegisterFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
