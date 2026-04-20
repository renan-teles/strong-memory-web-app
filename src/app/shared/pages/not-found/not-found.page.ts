import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrongMemoryBrandComponent } from '../../ui/components/strong-memory-brand/strong-memory-brand.component';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, StrongMemoryBrandComponent],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage {
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  get linkText(): string {
    return this.authStorage.isAuthenticated() ? 'Voltar ao Início' : 'Ir para Login';
  }
}
