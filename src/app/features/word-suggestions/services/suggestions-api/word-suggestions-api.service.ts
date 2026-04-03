import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { Injectable } from '@angular/core';
import { IPagePagination } from '../../../../shared/models/page-pagination.interface';
import { IPaginationResponse } from '../../../../shared/models/pagination-response.interface';
import { IFilterWordSuggestionFormData } from '../../models/filter-word-suggestion-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsApiService extends AbstractApiService {
  constructor() {
    super();
  }

  register(
    userId: string,
    data: IWordSuggestionData,
  ): Observable<IApiResponse<IWordSuggestionData>> {
    return this.http.post<IApiResponse<IWordSuggestionData>>(
      `${this.BASE_URL}/word-suggestion/register`,
      data,
      {
        params: {
          userId: userId,
        },
      },
    );
  }

  delete(suggestionId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/word-suggestion/delete/${suggestionId}`);
  }

  loadAll(
    pagination: IPagePagination,
  ): Observable<IApiResponse<IPaginationResponse<IWordSuggestionData>>> {
    return this.http.get<IApiResponse<IPaginationResponse<IWordSuggestionData>>>(
      `${this.BASE_URL}/word-suggestion/get-all`,
      {
        params: {
          page: pagination.page,
          size: pagination.size,
          sortBy: pagination.sortBy,
        },
      },
    );
  }

  loadByPeriod(
    filter: IFilterWordSuggestionFormData,
    pagination: IPagePagination,
  ): Observable<IApiResponse<IPaginationResponse<IWordSuggestionData>>> {
    return this.http.get<IApiResponse<IPaginationResponse<IWordSuggestionData>>>(
      `${this.BASE_URL}/word-suggestion/get-by-period`,
      {
        params: {
          startDate: filter.startDate,
          endDate: filter.endDate,
          page: pagination.page,
          size: pagination.size,
          sortBy: pagination.sortBy,
        },
      },
    );
  }
}
