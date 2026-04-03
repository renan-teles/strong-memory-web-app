import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWordSuggestionsPage } from './list-word-suggestions.page';

describe('ListWordSuggestionsPage', () => {
  let component: ListWordSuggestionsPage;
  let fixture: ComponentFixture<ListWordSuggestionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWordSuggestionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListWordSuggestionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
