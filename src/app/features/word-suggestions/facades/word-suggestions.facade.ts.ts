import { inject, Injectable } from '@angular/core';
import { WordSuggestionsApiService } from '../services/suggestions/word-suggestions-api.service';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { IWordSuggestionData } from '../models/word-suggestion-data.interface';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsFacade {
  private readonly api: WordSuggestionsApiService = inject(WordSuggestionsApiService);
  private readonly authStorage: AuthStorageService = inject(AuthStorageService);

  register(data: IWordSuggestionData): Observable<IApiResponse<IWordSuggestionData>> {
    return this.api.register(this.authStorage.getUserId() ?? '-1', data);
  }
}
