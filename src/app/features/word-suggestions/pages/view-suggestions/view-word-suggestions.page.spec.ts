import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWordSuggestionsPage } from './view-word-suggestions.page';

describe('ViewWordSuggestionsPage', () => {
  let component: ViewWordSuggestionsPage;
  let fixture: ComponentFixture<ViewWordSuggestionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWordSuggestionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewWordSuggestionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
