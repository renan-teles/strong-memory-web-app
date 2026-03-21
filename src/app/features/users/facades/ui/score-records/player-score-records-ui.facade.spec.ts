import { TestBed } from '@angular/core/testing';

import { PlayerScoreRecordsUiFacade } from './player-score-records-ui.facade';

describe('PlayerScoreRecordsUiFacade', () => {
  let service: PlayerScoreRecordsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerScoreRecordsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
