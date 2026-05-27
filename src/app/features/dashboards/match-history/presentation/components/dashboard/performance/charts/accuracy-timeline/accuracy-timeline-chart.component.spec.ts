import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyTimelineChartComponent } from './accuracy-timeline-chart.component';

describe('AccuracyTimelineChartComponent', () => {
  let component: AccuracyTimelineChartComponent;
  let fixture: ComponentFixture<AccuracyTimelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccuracyTimelineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccuracyTimelineChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
