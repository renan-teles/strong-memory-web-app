import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../../core/services/api/abstract-api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { HttpContext } from '@angular/common/http';
import { SKIP_AUTH } from '../../../../../core/http/tokens/skip-auth.context';
import { LoginRequest } from '../../dto/request/login-request';
import { AuthResponse } from '../../dto/response/auth-response';
import { PathUser } from '../../../../../shared/types/api/path-user.type';
import { RegisterUserRequest } from '../../../../users/data/dto/request/register-user-request';
import { CreatedUserResponse } from '../../../../users/data/dto/response/created-user-response';
import { UserRole } from '../../../../users/domain/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loginPlayer(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.loginUser(data, UserRole.PLAYER);
  }

  loginAdmin(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.loginUser(data, UserRole.ADMIN);
  }

  registerPlayer(data: RegisterUserRequest): Observable<ApiResponse<CreatedUserResponse>> {
    return this.registerUser(data, 'player');
  }

  registerAdmin(data: RegisterUserRequest): Observable<ApiResponse<CreatedUserResponse>> {
    return this.registerUser(data, 'admin');
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.BASE_URL}/auth/refresh`, null, {
      withCredentials: true,
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/auth/logout`, null, {
      withCredentials: true,
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  private loginUser(data: LoginRequest, roleUser: UserRole): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.BASE_URL}/auth`, data, {
      params: {
        role: roleUser,
      },
      withCredentials: true,
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  private registerUser(
    data: RegisterUserRequest,
    pathUser: PathUser,
  ): Observable<ApiResponse<CreatedUserResponse>> {
    return this.http.post<ApiResponse<CreatedUserResponse>>(`${this.BASE_URL}/${pathUser}`, data, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }
}
