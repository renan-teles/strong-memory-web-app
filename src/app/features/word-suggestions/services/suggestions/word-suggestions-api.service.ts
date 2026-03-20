import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IWordSuggestionFormData } from '../../models/word-suggestion-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsApiService extends ApiService {
  registerSuggestion(
    userId: string,
    data: IWordSuggestionFormData,
  ): Observable<IApiResponse<IWordSuggestionFormData>> {
    return this.http.post<IApiResponse<IWordSuggestionFormData>>(
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
