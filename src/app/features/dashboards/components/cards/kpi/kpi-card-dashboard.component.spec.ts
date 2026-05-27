import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCardDashboardComponent } from './kpi-card-dashboard.component';

describe('KpiCardDashboardComponent', () => {
  let component: KpiCardDashboardComponent;
  let fixture: ComponentFixture<KpiCardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
