import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';

@Component({
  selector: 'app-not-authorized',
  imports: [RouterLink],
  templateUrl: './not-authorized.page.html',
  styleUrl: './not-authorized.page.css',
})
export class NotAuthorizedPage {
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  get linkText(): string {
    return this.authStorage.isAuthenticated() ? 'Voltar ao Início' : 'Ir para Login';
  }
}
