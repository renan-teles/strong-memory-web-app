import { TestBed } from '@angular/core/testing';

import { PlayGameUiFacade } from './play-game-page.facade';

describe('PlayGameUiFacade', () => {
  let service: PlayGameUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayGameUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
