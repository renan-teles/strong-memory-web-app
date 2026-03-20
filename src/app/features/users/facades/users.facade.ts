import { inject, Injectable } from '@angular/core';
import { IUserFormData } from '../models/user-form-data.interface';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { ICreatedUser } from '../models/created-user.interface';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { UsersApiService } from '../services/user-api/users-api.service';
import { IAuthUser } from '../models/auth-user-interface';
import { IUserScoreRecord } from '../models/user-score-record.interface';
import { IUpdatePasswordFormData } from '../models/update-password-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly api = inject(UsersApiService);
  private readonly authStorage = inject(AuthStorageService);

  registerPlayer(data: IUserFormData): Observable<IApiResponse<ICreatedUser>> {
    return this.api.registerPlayer(data);
  }

  loginPlayer(data: IUserFormData): Observable<IApiResponse<IAuthUser>> {
    return this.api.loginPlayer(data).pipe(
      tap((response) => {
        const token = response.data!.token;
        const userId = response.data!.userId;
        const role = response.data!.role;

        this.authStorage.saveToken(token);
        this.authStorage.saveUserId(`${userId}`);
        this.authStorage.saveUserRole(role);
      }),
    );
  }

  getPlayerSocreRecords(): Observable<IApiResponse<IUserScoreRecord[]>> {
    return this.api.getPlayerSocreRecords(this.getUserId());
  }

  updatePlayerPassword(data: IUpdatePasswordFormData): Observable<void> {
    return this.api.updatePlayerPassword(this.getUserId(), data);
  }

  private getUserId(): string {
    return this.authStorage.getUserId() ?? '-1';
  }
}
