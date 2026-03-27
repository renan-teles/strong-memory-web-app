import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IPagePagination } from '../../../../shared/models/page-pagination.interface';
import { IPaginationResponse } from '../../../../shared/models/pagination-response.interface';
import { IWordData } from '../../models/word-data.interface';
import { Observable } from 'rxjs';
import { IWordDifficultyFormData } from '../../../../shared/models/word-difficulty-form-data.interface';
import { IWordDifficultyData } from '../../../../shared/models/word-difficulty-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  register(data: IWordData): Observable<IApiResponse<IWordData>> {
    return this.http.post<IApiResponse<IWordData>>(`${this.BASE_URL}/word/register`, data);
  }

  delete(wordId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/word/delete/${wordId}`);
  }

  update(wordId: number, data: IWordData): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/word/update/${wordId}`, data);
  }

  loadByDifficulty(
    data: IWordDifficultyFormData,
    pagination: IPagePagination,
  ): Observable<IApiResponse<IPaginationResponse<IWordData>>> {
    return this.http.get<IApiResponse<IPaginationResponse<IWordData>>>(
      `${this.BASE_URL}/word/get-all-by-difficulty`,
      {
        params: {
          difficulty: data.difficulty,
          page: pagination.page,
          size: pagination.size,
          sort_by: pagination.sortBy ?? 'id',
        },
      },
    );
  }

  loadRandomWords(difficulty: IWordDifficultyData): Observable<IApiResponse<IWordData[]>> {
    return this.http.get<IApiResponse<IWordData[]>>(`${this.BASE_URL}/word/get-random-words`, {
      params: {
        difficulty: difficulty.difficulty,
        quantity: difficulty.maxQuantityWords,
      },
    });
  }
}
