import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../../shared/types/api/api-response.interface';
import { UpdatePasswordRequest } from '../../../dto/request/update-password-request';
import { UpdateScoreRecordRequest } from '../../../dto/request/update-score-record-request';
import { ScoreRecordResponse } from '../../../dto/response/score-record-response';
import { AbstractApiService } from '../../../../../../core/services/api/abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loadScoreRecords(): Observable<ApiResponse<ScoreRecordResponse[]>> {
    return this.http.get<ApiResponse<ScoreRecordResponse[]>>(`${this.BASE_URL}/player/me/scores`);
  }

  loadScoreRecord(difficulty: string): Observable<ApiResponse<ScoreRecordResponse>> {
    return this.http.get<ApiResponse<ScoreRecordResponse>>(`${this.BASE_URL}/player/me/score`, {
      params: {
        difficulty,
      },
    });
  }

  updatePassword(data: UpdatePasswordRequest): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/player/me/password`, data);
  }

  updateScoreRecord(
    scoreId: number,
    data: UpdateScoreRecordRequest,
  ): Observable<ApiResponse<ScoreRecordResponse>> {
    return this.http.put<ApiResponse<ScoreRecordResponse>>(
      `${this.BASE_URL}/player/me/new-score/${scoreId}`,
      data,
    );
  }
}
