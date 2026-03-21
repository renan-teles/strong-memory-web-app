import { TestBed } from '@angular/core/testing';

import { WordsFacade } from './words.facade';

describe('WordsFacade', () => {
  let service: WordsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
