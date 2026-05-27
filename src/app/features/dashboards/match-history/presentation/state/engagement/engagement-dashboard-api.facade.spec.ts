import { TestBed } from '@angular/core/testing';

import { EngagementDashboardApiFacade } from './engagement-dashboard-api.facade';

describe('EngagementDashboardApiFacade', () => {
  let service: EngagementDashboardApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementDashboardApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
