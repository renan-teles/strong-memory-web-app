import { TestBed } from '@angular/core/testing';

import { PerformanceDashboardApiFacade } from './performance-dashboard-api.facade';

describe('PerformanceDashboardApiFacade', () => {
  let service: PerformanceDashboardApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceDashboardApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
