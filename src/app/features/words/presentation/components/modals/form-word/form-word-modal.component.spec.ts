import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWordModalComponent } from './form-word-modal.component';

describe('FormWordModalComponent', () => {
  let component: FormWordModalComponent;
  let fixture: ComponentFixture<FormWordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWordModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormWordModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
