import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StrongMemoryBrandComponent } from '../strong-memory-brand/strong-memory-brand.component';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { NavbarLinkService } from '../../../core/services/navbar-link/navbar-link.service';
import { INavbarLink } from '../../models/nvabar-link.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  get links(): INavbarLink[] {
    return this.linksService.getLinksByRole(this.authStorage.getUserRole());
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
