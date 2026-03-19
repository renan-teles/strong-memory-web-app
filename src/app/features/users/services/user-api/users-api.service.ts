import { Injectable } from '@angular/core';
import { IUserFormData } from '../../models/user-form-data.interface';
import { ICreatedUser } from '../../models/created-user.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';
import { IAuthUser } from '../../models/auth-user-interface';
import { ApiService } from '../../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends ApiService {
  registerPlayer(data: IUserFormData): Observable<IApiResponse<ICreatedUser>> {
    return this.http.post<IApiResponse<ICreatedUser>>(`${this.BASE_URL}/player/register`, data);
  }

  loginPlayer(data: IUserFormData): Observable<IApiResponse<IAuthUser>> {
    return this.http.post<IApiResponse<IAuthUser>>(`${this.BASE_URL}/player/auth`, {
      email: data.email,
      password: data.password,
    });
  }
}
