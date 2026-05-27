import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StrongMemoryBrandComponent } from '../strong-memory-brand/strong-memory-brand.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarLink } from '../../../types/ui/navbar/navbar-link.interface';
import { NavbarLinkService } from '../../../services/navbar-link/navbar-link.service';
import { AuthStateService } from '../../../../core/services/auth/auth-state.service';
import { LoginApiFacade } from '../../../../features/auth/presentation/state/login/api/login-api.facade';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, StrongMemoryBrandComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router: Router = inject(Router);
  private readonly authState: AuthStateService = inject(AuthStateService);
  private readonly linksService: NavbarLinkService = inject(NavbarLinkService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly loginFacade: LoginApiFacade = inject(LoginApiFacade);

  get isAuthenticated(): boolean {
    return this.authState.isAuthenticated();
  }

  get isPlayer(): boolean {
    return this.authState.isPlayer();
  }

  get links(): NavbarLink[] {
    return !this.isAuthenticated
      ? this.linksService.getOpenLinks()
      : this.linksService.getByUserRole(this.authState.getUserRole()!, this.isPlayer);
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
    this.loginFacade.logout();
  }
}
