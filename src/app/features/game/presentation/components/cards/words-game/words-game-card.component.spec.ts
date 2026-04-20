import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsGameCardComponent } from './words-game-card.component';

describe('WordsGameCardComponent', () => {
  let component: WordsGameCardComponent;
  let fixture: ComponentFixture<WordsGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsGameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordsGameCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
