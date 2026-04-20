import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StrongMemoryBrandComponent } from '../strong-memory-brand/strong-memory-brand.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStorageService } from '../../../../core/services/auth-storage/auth-storage.service';
import { NavbarLink } from '../../../types/ui/navbar/navbar-link.interface';
import { NavbarLinkService } from '../../../services/navbar-link/navbar-link.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, StrongMemoryBrandComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router: Router = inject(Router);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);
  private readonly linksService: NavbarLinkService = inject(NavbarLinkService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  get brandLink(): string {
    return !this.isAuthenticated || this.authStorage.isPlayer()
      ? '/app/game/start'
      : '/app/words/list';
  }

  get isAuthenticated(): boolean {
    return this.authStorage.isAuthenticated();
  }

  get isPlayer(): boolean {
    return this.authStorage.isPlayer();
  }

  get links(): NavbarLink[] {
    return !this.isAuthenticated
      ? this.linksService.getOpenLinks()
      : this.linksService.getLinksByUserRole(this.authStorage.getUserRole()!, this.isPlayer);
  }

  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;

      const navbar = document.getElementById('navbarNav');
      if (navbar?.classList.contains('show')) {
        navbar.classList.remove('show');
      }
    });
  }

  onLogout(): void {
    this.authStorage.clearAll();
    this.router.navigate(['/auth/player']);
  }
}
