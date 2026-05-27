import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractApiService } from '../../../../../core/services/api/abstract-api.service';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { PaginationResponse } from '../../../../../shared/types/pagination/pagination-response.interface';
import { PagePagination } from '../../../../../shared/types/pagination/page-pagination.interface';
import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { UpdateWordRequest } from '../../dto/request/update-word-request';
import { WordRequest } from '../../dto/request/word-request';
import { WordResponse } from '../../dto/response/word-response';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  register(
    data: WordRequest,
    suggestionOrigin: boolean = false,
  ): Observable<ApiResponse<WordResponse>> {
    return this.http.post<ApiResponse<WordResponse>>(`${this.BASE_URL}/word`, data, {
      params: { suggestionOrigin },
    });
  }

  delete(wordId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/word/${wordId}`);
  }

  update(wordId: number, data: UpdateWordRequest): Observable<void> {
    return this.http.patch<void>(`${this.BASE_URL}/word/${wordId}`, data);
  }

  loadByDifficulty(
    data: WordDifficultyResponse,
    pagination: PagePagination,
  ): Observable<ApiResponse<PaginationResponse<WordResponse>>> {
    return this.http.get<ApiResponse<PaginationResponse<WordResponse>>>(`${this.BASE_URL}/word`, {
      params: {
        difficulty: data.name,
        ...pagination,
      },
    });
  }
}
