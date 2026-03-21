import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWordDifficultyFormComponent } from './select-word-difficulty-form.component';

describe('SelectWordDifficultyFormComponent', () => {
  let component: SelectWordDifficultyFormComponent;
  let fixture: ComponentFixture<SelectWordDifficultyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWordDifficultyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectWordDifficultyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
