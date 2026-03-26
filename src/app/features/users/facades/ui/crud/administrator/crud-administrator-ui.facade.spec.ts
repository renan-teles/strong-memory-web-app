import { TestBed } from '@angular/core/testing';

import { CrudAdministratorUiFacade } from './crud-administrator-ui.facade';

describe('CrudAdministratorUiFacade', () => {
  let service: CrudAdministratorUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudAdministratorUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
