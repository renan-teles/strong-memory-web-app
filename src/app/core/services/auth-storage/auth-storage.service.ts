import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/api/api-response.interface';
import { AuthResponse } from '../../../features/auth/data/dto/response/auth-response';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';
import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthStorageService {
//   private readonly BASE_NAME: string = 'strong_memory';
//   private readonly ACCESS_TOKEN: string = `${this.BASE_NAME}_user_access_token`;
//   private readonly REFRESH_TOKEN: string = `${this.BASE_NAME}_refresh_token`;
//   private readonly USER_ROLE: string = `${this.BASE_NAME}_user_role`;

//   private readonly router: Router = inject(Router);

//   saveAccessToken(token: string): void {
//     localStorage.setItem(this.ACCESS_TOKEN, token);
//   }

//   saveRefreshToken(refreshToken: string): void {
//     localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
//   }

//   saveUserRole(role: string): void {
//     localStorage.setItem(this.USER_ROLE, role);
//   }

//   saveAuthData(data: ApiResponse<AuthResponse>) {
//     this.saveRefreshToken(data.data!.refreshToken);
//     this.saveAccessToken(data.data!.accessToken);
//     this.saveUserRole(data.data!.role);
//   }

//   getAccessToken(): string {
//     return localStorage.getItem(this.ACCESS_TOKEN) ?? '';
//   }

//   getRefreshToken(): string {
//     return localStorage.getItem(this.REFRESH_TOKEN) ?? '';
//   }

//   getUserRole(): UserRole | null {
//     const role = localStorage.getItem(this.USER_ROLE) ?? '';

//     if (!role) return null;

//     if (role == UserRole.ADMIN) return UserRole.ADMIN;
//     return UserRole.PLAYER;
//   }

//   clearAll(): void {
//     localStorage.clear();
//   }

//   logout(redirectTo: string = '/login') {
//     this.clearAll();
//     this.router.navigate([redirectTo]);
//   }

//   isAuthenticated(): boolean {
//     return this.getAccessToken() !== '' && this.getUserRole() !== null;
//   }

//   isPlayer(): boolean {
//     return this.isAuthenticated() && this.getUserRole() === UserRole.PLAYER;
//   }
// }
