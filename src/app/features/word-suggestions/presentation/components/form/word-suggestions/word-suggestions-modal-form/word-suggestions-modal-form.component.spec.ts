import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSuggestionsModalFormComponent } from './word-suggestions-modal-form.component';

describe('WordSuggestionsModalFormComponent', () => {
  let component: WordSuggestionsModalFormComponent;
  let fixture: ComponentFixture<WordSuggestionsModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSuggestionsModalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordSuggestionsModalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
