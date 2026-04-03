import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthUserFormCardComponent } from './auth-user-form-card.component';

describe('AuthUserFormCardComponent', () => {
  let component: AuthUserFormCardComponent;
  let fixture: ComponentFixture<AuthUserFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserFormCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthUserFormCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
