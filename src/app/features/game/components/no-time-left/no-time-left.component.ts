import { Component } from '@angular/core';

@Component({
  selector: 'app-no-time-left',
  imports: [],
  templateUrl: './no-time-left.component.html',
  styleUrl: './no-time-left.component.css',
})
export class NoTimeLeftComponent {
  reloadGame(): void {
    location.reload();
  }
}
