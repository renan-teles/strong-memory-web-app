import { TestBed } from '@angular/core/testing';

import { OverviewDashboardApiFacade } from './overview-dashboard-api.facade';

describe('OverviewDashboardApiFacade', () => {
  let service: OverviewDashboardApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewDashboardApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
