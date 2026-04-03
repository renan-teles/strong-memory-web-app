import { Injectable } from '@angular/core';
import { AbstractApiService } from '../api/abstract-api.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { IWordDifficultyData } from '../../../shared/models/word-difficulty-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyApiService extends AbstractApiService {
  constructor() {
    super();
  }

  loadAll(): Observable<IApiResponse<IWordDifficultyData[]>> {
    return this.http.get<IApiResponse<IWordDifficultyData[]>>(
      `${this.BASE_URL}/difficulty/get-all`,
    );
  }
}
