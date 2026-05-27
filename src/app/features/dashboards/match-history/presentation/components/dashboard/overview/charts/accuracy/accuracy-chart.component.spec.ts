import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccuracyChartComponent } from './accuracy-chart.component';

describe('AccuracyChartComponent', () => {
  let component: AccuracyChartComponent;
  let fixture: ComponentFixture<AccuracyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccuracyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccuracyChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
