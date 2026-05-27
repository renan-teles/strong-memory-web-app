import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDashboardPage } from './game-dashboard.page';

describe('GameDashboardPage', () => {
  let component: GameDashboardPage;
  let fixture: ComponentFixture<GameDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
