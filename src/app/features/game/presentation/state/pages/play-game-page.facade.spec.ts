import { TestBed } from '@angular/core/testing';

import { PlayGamePageFacade } from './play-game-page.facade';

describe('PlayGamePageFacade', () => {
  let service: PlayGamePageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayGamePageFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
