import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestScoreBarChartComponent } from './highest-score-bar-chart.component';

describe('HighestScoreBarChartComponent', () => {
  let component: HighestScoreBarChartComponent;
  let fixture: ComponentFixture<HighestScoreBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighestScoreBarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HighestScoreBarChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
