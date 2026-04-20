import { TestBed } from '@angular/core/testing';

import { LoadRandomWordsFacade } from './load-random-words.facade';

describe('LoadRandomWordsFacade', () => {
  let service: LoadRandomWordsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadRandomWordsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
