import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreHistoryScatterChartComponent } from './score-history-scatter-chart.component';

describe('ScoreHistoryScatterChartComponent', () => {
  let component: ScoreHistoryScatterChartComponent;
  let fixture: ComponentFixture<ScoreHistoryScatterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreHistoryScatterChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreHistoryScatterChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
