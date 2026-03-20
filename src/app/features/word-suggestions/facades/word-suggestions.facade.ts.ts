import { inject, Injectable } from '@angular/core';
import { WordSuggestionsApiService } from '../services/suggestions/word-suggestions-api.service';
import { AuthStorageService } from '../../../core/services/auth-storage/auth-storage.service';
import { IWordSuggestionFormData } from '../models/word-suggestion-form-data.interface';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordSuggestionsFacade {
  private readonly api = inject(WordSuggestionsApiService);
  private readonly authStorage = inject(AuthStorageService);

  registerSuggestion(
    data: IWordSuggestionFormData,
  ): Observable<IApiResponse<IWordSuggestionFormData>> {
    return this.api.registerSuggestion(this.authStorage.getUserId() ?? '-1', data);
  }
}
