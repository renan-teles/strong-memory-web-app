import { TestBed } from '@angular/core/testing';

import { ScoreRecordFacade } from './score-record.facade';

describe('ScoreRecordFacade', () => {
  let service: ScoreRecordFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRecordFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
