import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly BASE_NAME: string = 'strong_memory_';
  private readonly tokenName!: string;
  private readonly userIdName!: string;
  private readonly userRoleName!: string;

  constructor() {
    this.tokenName = `${this.BASE_NAME}user_token`;
    this.userIdName = `${this.BASE_NAME}user_id`;
    this.userRoleName = `${this.BASE_NAME}user_role`;
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  saveUserId(id: string) {
    localStorage.setItem(this.userIdName, id);
  }

  saveUserRole(role: string) {
    localStorage.setItem(this.userRoleName, role);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName) ?? '';
  }

  getUserRole(): string {
    return localStorage.getItem(this.userRoleName) ?? '';
  }

  getUserId(): string {
    return localStorage.getItem(this.userIdName) ?? '';
  }

  clearAll(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.getToken() != '' && this.getUserRole() != '' && this.getUserId() != '';
  }

  isPlayer(): boolean {
    return this.isAuthenticated() && this.getUserRole() === 'ROLE_PLAYER';
  }
}
