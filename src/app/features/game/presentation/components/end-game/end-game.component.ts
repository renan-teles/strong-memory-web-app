import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-end-game',
  imports: [RouterLink],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css',
})
export class EndGameComponent {
  @Input({ required: true }) score!: number;
}
