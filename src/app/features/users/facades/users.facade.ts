import { inject, Injectable } from '@angular/core';
import { IUserData } from '../models/user-data.interface';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { ICreatedUser } from '../models/created-user.interface';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { UsersApiService } from '../services/users-api/users-api.service';
import { IUserScoreRecord } from '../models/user-score-record.interface';
import { IUpdatePasswordData } from '../models/update-password-data.interface';
import { IUpdateScoreData } from '../models/update-score-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly api: UsersApiService = inject(UsersApiService);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  registerPlayer(data: IUserData): Observable<IApiResponse<ICreatedUser>> {
    return this.api.registerPlayer(data);
  }

  registerAdministrator(data: IUserData): Observable<IApiResponse<ICreatedUser>> {
    return this.api.registerAdministrator(data);
  }

  loadPlayerScoreRecords(): Observable<IApiResponse<IUserScoreRecord[]>> {
    return this.api.loadPlayerScoreRecords(this.getUserId());
  }

  loadScoreRecord(difficulty: string): Observable<IApiResponse<IUserScoreRecord>> {
    return this.api.loadPlayerScoreRecord(this.getUserId(), difficulty);
  }

  updateScoreRecord(
    scoreId: string,
    data: IUpdateScoreData,
  ): Observable<IApiResponse<IUserScoreRecord>> {
    return this.api.updatePlayerScoreRecord(scoreId, data);
  }

  updatePlayerPassword(data: IUpdatePasswordData): Observable<void> {
    return this.api.updatePlayerPassword(this.getUserId(), data);
  }

  private getUserId(): string {
    return this.authStorage.getUserId() ?? '-1';
  }
}
