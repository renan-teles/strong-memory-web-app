import { Injectable } from '@angular/core';
import { IUserFormData } from '../../models/user-form-data.interface';
import { ICreatedUser } from '../../models/created-user.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';
import { IAuthUser } from '../../models/auth-user-interface';
import { IUserScoreRecord } from '../../models/user-score-record.interface';
import { ApiService } from '../../../../core/services/api/api.service';
import { IUpdatePasswordFormData } from '../../models/update-password-form-data.interface';
import { HttpContext, HttpContextToken } from '@angular/common/http';

export const SKIP_AUTH = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends ApiService {
  registerPlayer(data: IUserFormData): Observable<IApiResponse<ICreatedUser>> {
    return this.http.post<IApiResponse<ICreatedUser>>(`${this.BASE_URL}/player/register`, data, {
      context: new HttpContext().set(SKIP_AUTH, true),
    });
  }

  loginPlayer(data: IUserFormData): Observable<IApiResponse<IAuthUser>> {
    return this.http.post<IApiResponse<IAuthUser>>(
      `${this.BASE_URL}/player/auth`,
      {
        email: data.email,
        password: data.password,
      },
      {
        context: new HttpContext().set(SKIP_AUTH, true),
      },
    );
  }

  getPlayerSocreRecords(userId: string): Observable<IApiResponse<IUserScoreRecord[]>> {
    return this.http.get<IApiResponse<IUserScoreRecord[]>>(
      `${this.BASE_URL}/score-record/get-all-by-user-id/${userId}`,
    );
  }

  updatePlayerPassword(userId: string, data: IUpdatePasswordFormData): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/player/update-password/${userId}`, data);
  }
}
