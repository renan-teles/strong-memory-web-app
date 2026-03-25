import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGameComponent } from './error-game.component';

describe('ErrorGameComponent', () => {
  let component: ErrorGameComponent;
  let fixture: ComponentFixture<ErrorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorGameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
