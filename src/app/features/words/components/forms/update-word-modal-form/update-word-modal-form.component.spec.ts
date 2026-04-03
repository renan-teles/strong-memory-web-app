import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWordModalFormComponent } from './update-word-modal-form.component';

describe('UpdateWordModalFormComponent', () => {
  let component: UpdateWordModalFormComponent;
  let fixture: ComponentFixture<UpdateWordModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWordModalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateWordModalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
