import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGamePage } from './start-game.page';

describe('StartGamePage', () => {
  let component: StartGamePage;
  let fixture: ComponentFixture<StartGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartGamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(StartGamePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
