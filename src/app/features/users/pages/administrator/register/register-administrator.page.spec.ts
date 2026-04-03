import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdministratorPage } from './register-administrator.page';

describe('RegisterAdministratorPage', () => {
  let component: RegisterAdministratorPage;
  let fixture: ComponentFixture<RegisterAdministratorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAdministratorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAdministratorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
