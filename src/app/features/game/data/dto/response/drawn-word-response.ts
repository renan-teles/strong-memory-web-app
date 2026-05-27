import { GameWordResponse } from './game-word-response';

export interface DrawnWordResponse {
  id: number;
  word: GameWordResponse;
  orderIndex: number;
  wasShown: boolean;
}
