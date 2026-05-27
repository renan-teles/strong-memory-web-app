import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDifficultyFormComponent } from './match-difficulty-form.component';

describe('MatchDifficultyFormComponent', () => {
  let component: MatchDifficultyFormComponent;
  let fixture: ComponentFixture<MatchDifficultyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchDifficultyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchDifficultyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
