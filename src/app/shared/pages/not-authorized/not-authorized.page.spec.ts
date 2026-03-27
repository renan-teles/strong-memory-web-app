import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedPage } from './not-authorized.page';

describe('NotAuthorizedPage', () => {
  let component: NotAuthorizedPage;
  let fixture: ComponentFixture<NotAuthorizedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAuthorizedPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotAuthorizedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
