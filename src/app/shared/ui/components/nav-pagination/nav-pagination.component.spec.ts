import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPaginationComponent } from './nav-pagination.component';

describe('NavPaginationComponent', () => {
  let component: NavPaginationComponent;
  let fixture: ComponentFixture<NavPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavPaginationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
