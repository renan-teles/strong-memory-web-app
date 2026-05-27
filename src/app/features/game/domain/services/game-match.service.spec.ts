import { TestBed } from '@angular/core/testing';

import { GameMatchService } from './game-match.service';

describe('GameMatchService', () => {
  let service: GameMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
