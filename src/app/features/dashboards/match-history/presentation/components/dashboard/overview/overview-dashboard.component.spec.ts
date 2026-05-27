import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewDashboardComponent } from './overview-dashboard.component';

describe('OverviewDashboardComponent', () => {
  let component: OverviewDashboardComponent;
  let fixture: ComponentFixture<OverviewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
