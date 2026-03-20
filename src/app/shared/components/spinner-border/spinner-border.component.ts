import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-border',
  imports: [],
  templateUrl: './spinner-border.component.html',
  styleUrl: './spinner-border.component.css',
})
export class SpinnerBorderComponent {
  @Input() text: string = 'Carregando...';
  @Input() classText: string = 'text-ligth';
}
