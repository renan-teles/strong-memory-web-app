import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserPage } from './auth-user.page';

describe('AuthUserPage', () => {
  let component: AuthUserPage;
  let fixture: ComponentFixture<AuthUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthUserPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
