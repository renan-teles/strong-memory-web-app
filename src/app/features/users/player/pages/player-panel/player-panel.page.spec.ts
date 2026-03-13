import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPanelPage } from './player-panel.page';

describe('PlayerPanelPage', () => {
  let component: PlayerPanelPage;
  let fixture: ComponentFixture<PlayerPanelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerPanelPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPanelPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
