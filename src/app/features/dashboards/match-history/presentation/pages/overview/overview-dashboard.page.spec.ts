import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewDashboardPage } from './overview-dashboard.page';

describe('OverviewDashboardPage', () => {
  let component: OverviewDashboardPage;
  let fixture: ComponentFixture<OverviewDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
