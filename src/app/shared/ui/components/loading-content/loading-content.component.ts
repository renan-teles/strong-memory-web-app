import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-content',
  imports: [],
  templateUrl: './loading-content.component.html',
  styleUrl: './loading-content.component.css',
})
export class LoadingContentComponent {
  @Input() message: string = 'Carregando...';
}
