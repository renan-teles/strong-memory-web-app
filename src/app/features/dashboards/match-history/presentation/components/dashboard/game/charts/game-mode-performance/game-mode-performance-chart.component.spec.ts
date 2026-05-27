import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModePerformanceChartComponent } from './game-mode-performance-chart.component';

describe('GameModePerformanceChartComponent', () => {
  let component: GameModePerformanceChartComponent;
  let fixture: ComponentFixture<GameModePerformanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModePerformanceChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameModePerformanceChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
