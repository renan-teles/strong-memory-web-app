import { TestBed } from '@angular/core/testing';
import { GameUtilsFacade } from './game-utils.facade';

describe('GameUtilsFacade', () => {
  let service: GameUtilsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUtilsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
