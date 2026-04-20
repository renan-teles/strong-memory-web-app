import { TestBed } from '@angular/core/testing';

import { FormWordSuggestionModalService } from './form-word-suggestion-modal.service';

describe('FormWordSuggestionModalService', () => {
  let service: FormWordSuggestionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormWordSuggestionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
