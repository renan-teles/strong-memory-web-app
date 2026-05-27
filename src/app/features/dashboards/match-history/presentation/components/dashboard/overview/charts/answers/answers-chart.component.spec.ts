import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersChartComponent } from './answers-chart.component';

describe('AnswersChartComponent', () => {
  let component: AnswersChartComponent;
  let fixture: ComponentFixture<AnswersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswersChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswersChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
