import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWordsPage } from './list-words.page';

describe('ListWordsPage', () => {
  let component: ListWordsPage;
  let fixture: ComponentFixture<ListWordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWordsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListWordsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
