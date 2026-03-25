import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDifficultyFormComponent } from './select-difficulty-form.component';

describe('SelectDifficultyFormComponent', () => {
  let component: SelectDifficultyFormComponent;
  let fixture: ComponentFixture<SelectDifficultyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDifficultyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDifficultyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
