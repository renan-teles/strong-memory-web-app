import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingRandomWordsComponent } from './loading-random-words.component';

describe('LoadingRandomWordsComponent', () => {
  let component: LoadingRandomWordsComponent;
  let fixture: ComponentFixture<LoadingRandomWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingRandomWordsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingRandomWordsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
