import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyStackedAreaChartComponent } from './accuracy-stacked-area-chart.component';

describe('AccuracyStackedAreaChartComponent', () => {
  let component: AccuracyStackedAreaChartComponent;
  let fixture: ComponentFixture<AccuracyStackedAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccuracyStackedAreaChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccuracyStackedAreaChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
