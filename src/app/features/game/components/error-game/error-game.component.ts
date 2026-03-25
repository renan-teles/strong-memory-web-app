import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-game',
  imports: [RouterLink],
  templateUrl: './error-game.component.html',
  styleUrl: './error-game.component.css',
})
export class ErrorGameComponent {
  @Input() errorTitle: string = 'Erro inesperado.';
  @Input() errorMessage: string = 'Erro inesperado.';
}
