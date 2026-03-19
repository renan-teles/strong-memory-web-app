import { inject, Injectable } from '@angular/core';
import { IUserFormData } from '../models/user-form-data.interface';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { ICreatedUser } from '../models/created-user.interface';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { UsersApiService } from '../services/user-api/users-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly api = inject(UsersApiService);
  private readonly authStorage = inject(AuthStorageService);

  registerPlayer(data: IUserFormData): Observable<IApiResponse<ICreatedUser>> {
    return this.api.registerPlayer(data);
  }

  loginPlayer(data: IUserFormData) {
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
}
