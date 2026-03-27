import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFormComponent } from './word-form.component';

describe('WordFormComponent', () => {
  let component: WordFormComponent;
  let fixture: ComponentFixture<WordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
