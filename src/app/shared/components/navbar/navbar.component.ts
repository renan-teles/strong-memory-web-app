import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StrongMemoryBrandComponent } from '../strong-memory-brand/strong-memory-brand.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, StrongMemoryBrandComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router: Router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navbar = document.getElementById('navbarNav');
        if (navbar?.classList.contains('show')) {
          navbar.classList.remove('show');
        }
      }
    });
  }
}
