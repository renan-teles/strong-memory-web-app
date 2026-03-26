import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateAdministratorPage } from './authenticate-administrator.page';

describe('AuthenticateAdministratorPage', () => {
  let component: AuthenticateAdministratorPage;
  let fixture: ComponentFixture<AuthenticateAdministratorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticateAdministratorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticateAdministratorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
