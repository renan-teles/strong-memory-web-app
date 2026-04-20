import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestWordsPage } from './suggest-word.page';

describe('SuggestWordsPage', () => {
  let component: SuggestWordsPage;
  let fixture: ComponentFixture<SuggestWordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestWordsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestWordsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
