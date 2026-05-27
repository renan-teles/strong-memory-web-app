import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModeRadarChartComponent } from './game-mode-radar-chart.component';

describe('GameModeRadarChartComponent', () => {
  let component: GameModeRadarChartComponent;
  let fixture: ComponentFixture<GameModeRadarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModeRadarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameModeRadarChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
