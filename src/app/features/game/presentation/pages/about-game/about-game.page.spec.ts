import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGamePage } from './about-game.page';

describe('AboutGamePage', () => {
  let component: AboutGamePage;
  let fixture: ComponentFixture<AboutGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutGamePage],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutGamePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
