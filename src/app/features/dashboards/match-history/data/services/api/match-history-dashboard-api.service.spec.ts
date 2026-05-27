import { TestBed } from '@angular/core/testing';

import { MatchHistoryDashboardApiService } from './match-history-dashboard-api.service';

describe('MatchHistoryDashboardApiService', () => {
  let service: MatchHistoryDashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchHistoryDashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
