import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-time-left',
  imports: [RouterLink],
  templateUrl: './no-time-left.component.html',
  styleUrl: './no-time-left.component.css',
})
export class NoTimeLeftComponent {
  @Input({ required: true }) score!: number;
}
