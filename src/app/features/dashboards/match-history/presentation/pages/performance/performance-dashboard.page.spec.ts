import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDashboardPage } from './performance-dashboard.page';

describe('PerformanceDashboardPage', () => {
  let component: PerformanceDashboardPage;
  let fixture: ComponentFixture<PerformanceDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
