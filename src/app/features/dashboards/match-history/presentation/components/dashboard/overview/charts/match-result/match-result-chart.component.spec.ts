import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultChartComponent } from './match-result-chart.component';

describe('MatchResultChartComponent', () => {
  let component: MatchResultChartComponent;
  let fixture: ComponentFixture<MatchResultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchResultChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchResultChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
