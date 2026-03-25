import { inject, Injectable } from '@angular/core';
import { IUserData } from '../models/user-data.interface';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { ICreatedUser } from '../models/created-user.interface';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { UsersApiService } from '../services/user-api/users-api.service';
import { IAuthUser } from '../models/auth-user-interface';
import { IUserScoreRecord } from '../models/user-score-record.interface';
import { IUpdatePasswordData } from '../models/update-password-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly api: UsersApiService = inject(UsersApiService);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  registerPlayer(data: IUserData): Observable<IApiResponse<ICreatedUser>> {
    return this.api.registerPlayer(data);
  }

  loginPlayer(data: IUserData): Observable<IApiResponse<IAuthUser>> {
    return this.api.loginPlayer(data).pipe(
      tap((response: IApiResponse<IAuthUser>) => {
        const token = response.data!.token;
        const userId = response.data!.userId;
        const role = response.data!.role;

        this.authStorage.saveToken(token);
        this.authStorage.saveUserId(`${userId}`);
        this.authStorage.saveUserRole(role);
      }),
    );
  }

  loadPlayerSocreRecords(): Observable<IApiResponse<IUserScoreRecord[]>> {
    return this.api.loadPlayerSocreRecords(this.getUserId());
  }

  updatePlayerPassword(data: IUpdatePasswordData): Observable<void> {
    return this.api.updatePlayerPassword(this.getUserId(), data);
  }

  private getUserId(): string {
    return this.authStorage.getUserId() ?? '-1';
  }
}
