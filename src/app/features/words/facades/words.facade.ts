import { inject, Injectable } from '@angular/core';
import { WordsApiService } from '../services/words-api/words-api.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../shared/models/api-response.interface';
import { IPaginationResponse } from '../../../shared/models/pagination-response.interface';
import { IWordData } from '../models/word-data.interface';
import { IPagePagination } from '../../../shared/models/page-pagination.interface';
import { IWordDifficultyFormData } from '../../../shared/models/word-difficulty-form-data.interface';
import { IWordDifficultyData } from '../../../shared/models/word-difficulty-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordsFacade {
  private readonly api: WordsApiService = inject(WordsApiService);

  loadByDifficulty(
    data: IWordDifficultyFormData,
    page: number,
  ): Observable<IApiResponse<IPaginationResponse<IWordData>>> {
    const pagination: IPagePagination = {
      page,
      size: 10,
      sortBy: 'word',
    };
    return this.api.loadByDifficulty(data, pagination);
  }

  loadRandomWords(data: IWordDifficultyData) {
    return this.api.loadRandomWords(data);
  }
}
