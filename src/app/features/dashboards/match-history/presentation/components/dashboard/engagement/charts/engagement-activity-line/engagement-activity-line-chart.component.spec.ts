import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementActivityLineChartComponent } from './engagement-activity-line-chart.component';

describe('EngagementActivityLineChartComponent', () => {
  let component: EngagementActivityLineChartComponent;
  let fixture: ComponentFixture<EngagementActivityLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementActivityLineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementActivityLineChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
