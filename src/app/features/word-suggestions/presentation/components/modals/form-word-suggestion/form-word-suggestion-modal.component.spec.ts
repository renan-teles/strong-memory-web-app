import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWordSuggestionModalComponent } from './form-word-suggestion-modal.component';

describe('FormWordSuggestionModalComponent', () => {
  let component: FormWordSuggestionModalComponent;
  let fixture: ComponentFixture<FormWordSuggestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWordSuggestionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormWordSuggestionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
