import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlayerPage } from './register-player.page';

describe('RegisterPlayerPage', () => {
  let component: RegisterPlayerPage;
  let fixture: ComponentFixture<RegisterPlayerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPlayerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPlayerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
