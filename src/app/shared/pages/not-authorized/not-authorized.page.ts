import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth/auth-state.service';

@Component({
  selector: 'app-not-authorized',
  imports: [RouterLink],
  templateUrl: './not-authorized.page.html',
  styleUrl: './not-authorized.page.css',
})
export class NotAuthorizedPage {
  private readonly authState: AuthStateService = inject(AuthStateService);

  get linkText(): string {
    return this.authState.isAuthenticated() ? 'Voltar ao Início' : 'Ir para Login';
  }
}
