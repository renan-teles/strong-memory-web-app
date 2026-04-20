import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBorderComponent } from './spinner-border.component';

describe('SpinnerBorderComponent', () => {
  let component: SpinnerBorderComponent;
  let fixture: ComponentFixture<SpinnerBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerBorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerBorderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
