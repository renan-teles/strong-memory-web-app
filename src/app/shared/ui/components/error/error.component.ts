import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Input() errorTitle: string = 'Erro inesperado.';
  @Input() errorMessage: string = 'Erro inesperado.';
}
