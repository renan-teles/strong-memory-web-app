import { Component } from '@angular/core';
import { StrongMemoryBrandComponent } from '../strong-memory-brand/strong-memory-brand.component';

@Component({
  selector: 'app-footer',
  imports: [StrongMemoryBrandComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
