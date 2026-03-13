import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredWordsPage } from './registered-words.page';

describe('RegisteredWordsPage', () => {
  let component: RegisteredWordsPage;
  let fixture: ComponentFixture<RegisteredWordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredWordsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredWordsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
