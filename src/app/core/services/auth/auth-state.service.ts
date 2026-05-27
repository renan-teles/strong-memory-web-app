import { inject, Injectable } from '@angular/core';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly router: Router = inject(Router);
  private accessToken: string = '';
  private role: UserRole | null = null;

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  setUserRole(role: string): void {
    switch (role.toUpperCase()) {
      case UserRole.ADMIN:
        this.role = UserRole.ADMIN;
        break;

      default:
        this.role = UserRole.PLAYER;
        break;
    }
  }

  getUserRole(): UserRole | null {
    return this.role;
  }

  isPlayer(): boolean {
    return this.isAuthenticated() && this.getUserRole() === UserRole.PLAYER;
  }

  clear(): void {
    this.accessToken = '';
    this.role = null;
  }

  isAuthenticated(): boolean {
    return this.accessToken !== '' && this.role !== null;
  }

  clearAndRedirectToLogin() {
    this.clear();
    this.router.navigate(['/login']);
  }
}
