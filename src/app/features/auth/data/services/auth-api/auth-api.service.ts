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

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loginPlayer(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.loginUser(data, 'player');
  }

  registerPlayer(data: RegisterUserRequest): Observable<ApiResponse<CreatedUserResponse>> {
    return this.registerUser(data, 'player');
  }

  loginAdministrator(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.loginUser(data, 'administrator');
  }

  registerAdministrator(data: RegisterUserRequest): Observable<ApiResponse<CreatedUserResponse>> {
    return this.registerUser(data, 'administrator');
  }

  private loginUser(
    data: LoginRequest,
    pathUser: 'player' | 'administrator',
  ): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.BASE_URL}/${pathUser}/auth`, data, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  protected registerUser(
    data: RegisterUserRequest,
    pathUser: PathUser,
  ): Observable<ApiResponse<CreatedUserResponse>> {
    return this.http.post<ApiResponse<CreatedUserResponse>>(`${this.BASE_URL}/${pathUser}`, data, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }
}
