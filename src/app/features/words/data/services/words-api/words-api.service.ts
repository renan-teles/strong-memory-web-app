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
import { WordDifficultyRequest } from '../../../../word-difficulties/data/dto/request/word-difficulty-request';

@Injectable({
  providedIn: 'root',
})
export class WordsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  register(data: WordRequest): Observable<ApiResponse<WordResponse>> {
    return this.http.post<ApiResponse<WordResponse>>(`${this.BASE_URL}/word`, data);
  }

  delete(wordId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/word/${wordId}`);
  }

  update(wordId: number, data: UpdateWordRequest): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/word/${wordId}`, data);
  }

  loadByDifficulty(
    data: WordDifficultyRequest,
    pagination: PagePagination,
  ): Observable<ApiResponse<PaginationResponse<WordResponse>>> {
    return this.http.get<ApiResponse<PaginationResponse<WordResponse>>>(`${this.BASE_URL}/word`, {
      params: {
        difficulty: data.difficulty,
        ...pagination,
      },
    });
  }

  loadRandomWords(difficulty: WordDifficultyResponse): Observable<ApiResponse<WordResponse[]>> {
    return this.http.get<ApiResponse<WordResponse[]>>(`${this.BASE_URL}/word/random-list`, {
      params: {
        difficulty: difficulty.difficulty,
        quantity: difficulty.maxQuantityWords,
      },
    });
  }
}
