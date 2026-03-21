import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { IWordDifficultyData } from '../../models/word-difficulty-data.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IPagePagination } from '../../../../shared/models/page-pagination.interface';
import { IPaginationResponse } from '../../../../shared/models/pagination-response.interface';
import { IWordData } from '../../models/word-data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  findByDifficulty(
    data: IWordDifficultyData,
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
}
