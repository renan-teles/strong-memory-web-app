import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingWordsFormComponent } from './typing-words-form.component';

describe('TypingWordsFormComponent', () => {
  let component: TypingWordsFormComponent;
  let fixture: ComponentFixture<TypingWordsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingWordsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypingWordsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
