import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../../core/services/auth/auth-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-strong-memory-brand',
  imports: [RouterLink],
  templateUrl: './strong-memory-brand.component.html',
  styleUrl: './strong-memory-brand.component.css',
})
export class StrongMemoryBrandComponent {
  private readonly authState: AuthStateService = inject(AuthStateService);

  get link(): string {
    return !this.authState.isAuthenticated() || this.authState.isPlayer() ? '/home' : '/words/list';
  }
}
