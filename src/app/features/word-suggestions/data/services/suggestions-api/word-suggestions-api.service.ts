import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractApiService } from '../../../../../core/services/api/abstract-api.service';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { PagePagination } from '../../../../../shared/types/pagination/page-pagination.interface';
import { PaginationResponse } from '../../../../../shared/types/pagination/pagination-response.interface';
import { WordSuggestionRequest } from '../../dto/request/word-suggestion-request';
import { WordSuggestionResponse } from '../../dto/response/word-suggestion-response';
import { FilterWordSuggestionRequest } from '../../dto/request/filter-word-suggestion-request';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  register(data: WordSuggestionRequest): Observable<ApiResponse<WordSuggestionResponse>> {
    return this.http.post<ApiResponse<WordSuggestionResponse>>(
      `${this.BASE_URL}/word-suggestion`,
      data,
    );
  }

  delete(suggestionId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/word-suggestion/${suggestionId}`);
  }

  loadByPeriod(
    filter: FilterWordSuggestionRequest,
    pagination: PagePagination,
  ): Observable<ApiResponse<PaginationResponse<WordSuggestionResponse>>> {
    return this.http.get<ApiResponse<PaginationResponse<WordSuggestionResponse>>>(
      `${this.BASE_URL}/word-suggestion/period`,
      {
        params: {
          ...filter,
          ...pagination,
        },
      },
    );
  }
}
