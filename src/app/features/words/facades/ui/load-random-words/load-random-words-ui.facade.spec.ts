import { TestBed } from '@angular/core/testing';

import { LoadRandomWordsUiFacade } from './load-random-words-ui.facade';

describe('LoadRandomWordsUiFacade', () => {
  let service: LoadRandomWordsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadRandomWordsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
