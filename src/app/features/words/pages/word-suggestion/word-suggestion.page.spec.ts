import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSuggestionPage } from './word-suggestion.page';

describe('WordSuggestionPage', () => {
  let component: WordSuggestionPage;
  let fixture: ComponentFixture<WordSuggestionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSuggestionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WordSuggestionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
