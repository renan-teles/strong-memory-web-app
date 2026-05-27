import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../../core/services/api/abstract-api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { WordDifficultyResponse } from '../../dto/response/word-difficulty-response';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loadAll(): Observable<ApiResponse<WordDifficultyResponse[]>> {
    return this.http.get<ApiResponse<WordDifficultyResponse[]>>(`${this.BASE_URL}/difficulty/all`);
  }
}
