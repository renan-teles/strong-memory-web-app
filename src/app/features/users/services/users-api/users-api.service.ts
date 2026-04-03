import { Injectable } from '@angular/core';
import { IUserData } from '../../models/user-data.interface';
import { ICreatedUser } from '../../models/created-user.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';
import { IUserScoreRecord } from '../../models/user-score-record.interface';
import { IUpdatePasswordData } from '../../models/update-password-data.interface';
import { HttpContext } from '@angular/common/http';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { SKIP_AUTH } from '../../../auth/skip-auth.context';
import { IUpdateScoreData } from '../../models/update-score-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends AbstractApiService {
  constructor() {
    super();
  }

  registerPlayer(data: IUserData): Observable<IApiResponse<ICreatedUser>> {
    return this.registerUser(data, 'player');
  }

  registerAdministrator(data: IUserData): Observable<IApiResponse<ICreatedUser>> {
    return this.registerUser(data, 'administrator');
  }

  loadPlayerScoreRecords(userId: string): Observable<IApiResponse<IUserScoreRecord[]>> {
    return this.http.get<IApiResponse<IUserScoreRecord[]>>(
      `${this.BASE_URL}/score-record/get-user-scores`,
      {
        params: {
          userId,
        },
      },
    );
  }

  loadPlayerScoreRecord(
    userId: string,
    difficulty: string,
  ): Observable<IApiResponse<IUserScoreRecord>> {
    return this.http.get<IApiResponse<IUserScoreRecord>>(
      `${this.BASE_URL}/score-record/get-user-score`,
      {
        params: {
          userId,
          difficulty,
        },
      },
    );
  }

  updatePlayerScoreRecord(
    scoreId: string,
    data: IUpdateScoreData,
  ): Observable<IApiResponse<IUserScoreRecord>> {
    return this.http.put<IApiResponse<IUserScoreRecord>>(
      `${this.BASE_URL}/score-record/update/${scoreId}`,
      data,
    );
  }

  updatePlayerPassword(userId: string, data: IUpdatePasswordData): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/player/update-password/${userId}`, data);
  }

  private registerUser(
    data: IUserData,
    pathUser: 'player' | 'administrator',
  ): Observable<IApiResponse<ICreatedUser>> {
    return this.http.post<IApiResponse<ICreatedUser>>(
      `${this.BASE_URL}/${pathUser}/register`,
      data,
      {
        context: new HttpContext().set(SKIP_AUTH, true),
      },
    );
  }
}
