import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { IUserData } from '../../../users/models/user-data.interface';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IAuthUser } from '../../models/auth-user-interface';
import { HttpContext } from '@angular/common/http';
import { SKIP_AUTH } from '../../skip-auth.context';

@Injectable({
  providedIn: 'root',
})
export class AuthUsersApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loginPlayer(data: IUserData): Observable<IApiResponse<IAuthUser>> {
    return this.loginUser(data, 'player');
  }

  loginAdministrator(data: IUserData): Observable<IApiResponse<IAuthUser>> {
    return this.loginUser(data, 'administrator');
  }

  private loginUser(
    data: IUserData,
    pathUser: 'player' | 'administrator',
  ): Observable<IApiResponse<IAuthUser>> {
    return this.http.post<IApiResponse<IAuthUser>>(
      `${this.BASE_URL}/${pathUser}/auth`,
      {
        email: data.email,
        password: data.password,
      },
      {
        context: new HttpContext().set(SKIP_AUTH, true),
      },
    );
  }
}
