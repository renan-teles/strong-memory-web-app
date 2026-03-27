import { TestBed } from '@angular/core/testing';

import { FormWordModalService } from './form-word-modal.service';

describe('FormWordModalService', () => {
  let service: FormWordModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormWordModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
