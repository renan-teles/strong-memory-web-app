import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserFormComponent } from './auth-user-form.component';

describe('AuthUserFormComponent', () => {
  let component: AuthUserFormComponent;
  let fixture: ComponentFixture<AuthUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthUserFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
