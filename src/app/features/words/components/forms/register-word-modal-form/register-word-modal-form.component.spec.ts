import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWordModalFormComponent } from './register-word-modal-form.component';

describe('RegisterWordModalFormComponent', () => {
  let component: RegisterWordModalFormComponent;
  let fixture: ComponentFixture<RegisterWordModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWordModalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterWordModalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
