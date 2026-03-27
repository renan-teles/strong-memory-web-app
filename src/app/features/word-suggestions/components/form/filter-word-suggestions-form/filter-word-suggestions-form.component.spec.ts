import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWordSuggestionsFormComponent } from './filter-word-suggestions-form.component';

describe('FilterWordSuggestionsFormComponent', () => {
  let component: FilterWordSuggestionsFormComponent;
  let fixture: ComponentFixture<FilterWordSuggestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterWordSuggestionsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterWordSuggestionsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
