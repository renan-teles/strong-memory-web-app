import { inject, Injectable } from '@angular/core';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { IAuthUser } from '../models/auth-user-interface';
import { Observable, tap } from 'rxjs';
import { IUserData } from '../../users/models/user-data.interface';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { AuthUsersApiService } from '../services/auth-users-api/auth-users-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUsersFacade {
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);
  private readonly api: AuthUsersApiService = inject(AuthUsersApiService);

  loginPlayer(data: IUserData): Observable<IApiResponse<IAuthUser>> {
    return this.api.loginPlayer(data).pipe(
      tap((response: IApiResponse<IAuthUser>) => {
        this.saveUserInfos(response.data!);
      }),
    );
  }

  loginAdministrator(data: IUserData): Observable<IApiResponse<IAuthUser>> {
    return this.api.loginAdministrator(data).pipe(
      tap((response: IApiResponse<IAuthUser>) => {
        this.saveUserInfos(response.data!);
      }),
    );
  }

  private saveUserInfos(data: IAuthUser): void {
    const token = data.token;
    const userId = data.userId;
    const role = data.role;

    this.authStorage.saveToken(token);
    this.authStorage.saveUserId(`${userId}`);
    this.authStorage.saveUserRole(role);
  }
}
