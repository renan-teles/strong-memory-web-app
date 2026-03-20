import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSuggestionsFormComponent } from './word-suggestions-form.component';

describe('WordSuggestionsFormComponent', () => {
  let component: WordSuggestionsFormComponent;
  let fixture: ComponentFixture<WordSuggestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSuggestionsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordSuggestionsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
