import { TestBed } from '@angular/core/testing';

import { GameFacade } from './game.facade';

describe('GameFacade', () => {
  let service: GameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
