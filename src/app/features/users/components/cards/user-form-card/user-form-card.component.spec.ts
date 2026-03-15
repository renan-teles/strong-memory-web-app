import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCardComponent } from './user-form-card.component';

describe('UserFormCardComponent', () => {
  let component: UserFormCardComponent;
  let fixture: ComponentFixture<UserFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
