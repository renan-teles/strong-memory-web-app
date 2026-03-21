import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IWordSuggestionData } from '../../models/word-suggestion-data.interface';
import { AbstractApiService } from '../../../../core/services/api/abstract-api.service';
import { Injectable } from '@angular/core';

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
          user_id: userId,
        },
      },
    );
  }
}
