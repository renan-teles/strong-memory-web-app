import { TestBed } from '@angular/core/testing';

import { GameDashboardApiFacade } from './game-dashboard-api.facade';

describe('GameDashboardApiFacade', () => {
  let service: GameDashboardApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDashboardApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
