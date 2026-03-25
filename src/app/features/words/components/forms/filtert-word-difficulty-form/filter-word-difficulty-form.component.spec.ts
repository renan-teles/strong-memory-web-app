import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWordDifficultyFormComponent } from './filter-word-difficulty-form.component';

describe('FilterWordDifficultyFormComponent', () => {
  let component: FilterWordDifficultyFormComponent;
  let fixture: ComponentFixture<FilterWordDifficultyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterWordDifficultyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterWordDifficultyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
