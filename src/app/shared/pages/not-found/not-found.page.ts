import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrongMemoryBrandComponent } from '../../ui/components/strong-memory-brand/strong-memory-brand.component';
import { AuthStateService } from '../../../core/services/auth/auth-state.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, StrongMemoryBrandComponent],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage {
  private readonly authState: AuthStateService = inject(AuthStateService);

  get linkText(): string {
    return this.authState.isAuthenticated() ? 'Voltar ao Início' : 'Autenticar-se';
  }
}
