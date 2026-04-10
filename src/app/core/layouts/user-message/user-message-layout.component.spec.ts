import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageLayoutComponent } from './user-message-layout.component';

describe('UserMessageLayoutComponent', () => {
  let component: UserMessageLayoutComponent;
  let fixture: ComponentFixture<UserMessageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMessageLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMessageLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
