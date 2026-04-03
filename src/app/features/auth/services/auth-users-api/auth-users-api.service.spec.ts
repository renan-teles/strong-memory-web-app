import { TestBed } from '@angular/core/testing';

import { AuthUsersApiService } from './auth-users-api.service';

describe('AuthUsersApiService', () => {
  let service: AuthUsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
