import { inject, Injectable } from '@angular/core';
import { WordSuggestionsApiService } from '../services/suggestions-api/word-suggestions-api.service';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { IWordSuggestionData } from '../models/word-suggestion-data.interface';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';
import { IPaginationResponse } from '../../../shared/models/pagination-response.interface';
import { IFilterWordSuggestionFormData } from '../models/filter-word-suggestion-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsFacade {
  private readonly api: WordSuggestionsApiService = inject(WordSuggestionsApiService);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  register(data: IWordSuggestionData): Observable<IApiResponse<IWordSuggestionData>> {
    return this.api.register(this.authStorage.getUserId() ?? '-1', data);
  }

  delete(suggestionId: number): Observable<void> {
    return this.api.delete(suggestionId);
  }

  loadAll(page: number): Observable<IApiResponse<IPaginationResponse<IWordSuggestionData>>> {
    return this.api.loadAll({
      page,
      size: 10,
      sortBy: 'suggestedWord',
    });
  }

  loadByPeriod(
    filter: IFilterWordSuggestionFormData,
    page: number = 0,
  ): Observable<IApiResponse<IPaginationResponse<IWordSuggestionData>>> {
    return this.api.loadByPeriod(filter, {
      page,
      size: 10,
      sortBy: 'suggestedWord',
    });
  }
}
