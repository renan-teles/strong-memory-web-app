import { inject, Injectable } from '@angular/core';
import { WordsApiService } from '../services/words-api/words-api.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { IPaginationResponse } from '../../../shared/models/pagination-response.interface';
import { IWordData } from '../models/word-data.interface';
import { IWordDifficultyFormData } from '../../../shared/models/word-difficulty-form-data.interface';
import { IWordDifficultyData } from '../../../shared/models/word-difficulty-data.interface';
import { IUpdateWordData } from '../models/update-word-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordsFacade {
  private readonly api: WordsApiService = inject(WordsApiService);

  loadByDifficulty(
    data: IWordDifficultyFormData,
    page: number,
  ): Observable<IApiResponse<IPaginationResponse<IWordData>>> {
    return this.api.loadByDifficulty(data, {
      page,
      size: 10,
      sortBy: 'word',
    });
  }

  loadRandomWords(data: IWordDifficultyData): Observable<IApiResponse<IWordData[]>> {
    return this.api.loadRandomWords(data);
  }

  register(data: IWordData): Observable<IApiResponse<IWordData>> {
    return this.api.register(data);
  }

  delete(wordId: number): Observable<void> {
    return this.api.delete(wordId);
  }

  update(wordId: number, data: IUpdateWordData): Observable<void> {
    return this.api.update(wordId, data);
  }
}
