import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card-dashboard.component.html',
  styleUrl: './kpi-card-dashboard.component.css',
})
export class KpiCardDashboardComponent {
  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  value!: number | string;
}
