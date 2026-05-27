import { Injectable } from '@angular/core';
import { AbstractApiService } from '../../../../../core/services/api/abstract-api.service';
import { StartGameRequest } from '../../dto/request/start-game-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import { DrawnWordResponse } from '../../dto/response/drawn-word-response';
import { FinishGameResponse } from '../../dto/response/finish-game-response';
import { GameMatchResponse } from '../../dto/response/game-match-response';

@Injectable({
  providedIn: 'root',
})
export class GameApiService extends AbstractApiService {
  start(
    data: StartGameRequest,
    isDemo: boolean = false,
  ): Observable<ApiResponse<GameMatchResponse>> {
    const url: string = isDemo ? `${this.BASE_URL}/game/demo/start` : `${this.BASE_URL}/game/start`;
    return this.http.post<ApiResponse<GameMatchResponse>>(url, data);
  }

  finish(data: GameMatchResponse): Observable<ApiResponse<FinishGameResponse>> {
    return this.http.post<ApiResponse<FinishGameResponse>>(`${this.BASE_URL}/game/finish`, data);
  }

  moreRandomWords(
    matchId: number | null,
    startOrderIndex: number,
    isDemo: boolean = false,
    difficulty: string = '',
  ): Observable<ApiResponse<DrawnWordResponse[]>> {
    if (isDemo) {
      if (!difficulty) {
        throw new Error(
          'Dificuldade não definida para carregamento de mais palavras no modo demostração.',
        );
      }

      return this.http.get<ApiResponse<DrawnWordResponse[]>>(
        `${this.BASE_URL}/game/demo/more-random-words`,
        { params: { startOrderIndex, difficulty } },
      );
    }

    if (!matchId) {
      throw new Error('Id da partida não definido para carregamento de mais palavras.');
    }

    return this.http.post<ApiResponse<DrawnWordResponse[]>>(
      `${this.BASE_URL}/game/more-random-words/${matchId!}`,
      null,
      { params: { startOrderIndex } },
    );
  }
}
