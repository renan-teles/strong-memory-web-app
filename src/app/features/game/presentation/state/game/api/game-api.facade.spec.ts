import { TestBed } from '@angular/core/testing';

import { GameApiFacade } from './game-api.facade';

describe('GameApiFacade', () => {
  let service: GameApiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameApiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
