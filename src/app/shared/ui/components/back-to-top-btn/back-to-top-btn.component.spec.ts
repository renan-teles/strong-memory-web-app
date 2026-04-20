import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToTopBtnComponent } from './back-to-top-btn.component';

describe('BackToTopBtnComponent', () => {
  let component: BackToTopBtnComponent;
  let fixture: ComponentFixture<BackToTopBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToTopBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackToTopBtnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
