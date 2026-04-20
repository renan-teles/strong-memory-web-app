import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/api/api-response.interface';
import { AuthResponse } from '../../../features/auth/data/dto/response/auth-response';
import { UserRole } from '../../../features/users/domain/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly BASE_NAME: string = 'strong_memory_';
  private readonly tokenName!: string;
  private readonly userRoleName!: string;

  constructor() {
    this.tokenName = `${this.BASE_NAME}user_token`;
    this.userRoleName = `${this.BASE_NAME}user_role`;
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  saveUserRole(role: string) {
    localStorage.setItem(this.userRoleName, role);
  }

  saveAuthData(data: ApiResponse<AuthResponse>) {
    this.saveToken(data.data!.token);
    this.saveUserRole(data.data!.role);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName) ?? '';
  }

  getUserRole(): UserRole | null {
    const role = localStorage.getItem(this.userRoleName) ?? '';

    if (!role) return null;

    if (role == UserRole.ADM) return UserRole.ADM;
    return UserRole.PLAYER;
  }

  clearAll(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.getToken() !== '' && this.getUserRole() !== null;
  }

  isPlayer(): boolean {
    return this.isAuthenticated() && this.getUserRole() === UserRole.PLAYER;
  }
}
