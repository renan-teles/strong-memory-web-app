import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementDashboardPage } from './engagement-dashboard.page';

describe('EngagementDashboardPage', () => {
  let component: EngagementDashboardPage;
  let fixture: ComponentFixture<EngagementDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EngagementDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
