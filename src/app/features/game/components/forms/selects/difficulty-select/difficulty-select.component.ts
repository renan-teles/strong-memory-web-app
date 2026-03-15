import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-difficulty-select',
  imports: [],
  templateUrl: './difficulty-select.component.html',
  styleUrl: './difficulty-select.component.css',
})
export class DifficultySelectComponent {
  @Input({ required: true }) showLabel: boolean = true;

  @Input({ required: false }) labelContent: string = 'Selecione a Dificuldade:';
}
