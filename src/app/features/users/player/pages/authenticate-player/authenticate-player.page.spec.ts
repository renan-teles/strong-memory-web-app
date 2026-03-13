import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatePlayerPage } from './authenticate-player.page';

describe('AuthenticatePlayerPage', () => {
  let component: AuthenticatePlayerPage;
  let fixture: ComponentFixture<AuthenticatePlayerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatePlayerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatePlayerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
