import { TestBed } from '@angular/core/testing';

import { GameUserFacade } from './game-user.facade';

describe('GameUserFacade', () => {
  let service: GameUserFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUserFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
