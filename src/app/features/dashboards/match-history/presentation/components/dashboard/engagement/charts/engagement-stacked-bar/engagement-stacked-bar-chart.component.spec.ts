import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementStackedBarChartComponent } from './engagement-stacked-bar-chart.component';

describe('EngagementStackedBarChartComponent', () => {
  let component: EngagementStackedBarChartComponent;
  let fixture: ComponentFixture<EngagementStackedBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementStackedBarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementStackedBarChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
