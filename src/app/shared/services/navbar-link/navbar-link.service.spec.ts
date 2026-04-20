import { TestBed } from '@angular/core/testing';

import { NavbarLinkService } from './navbar-link.service';

describe('NavbarLinkService', () => {
  let service: NavbarLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
