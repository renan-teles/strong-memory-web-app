import { GameState } from './game-state.type';

export interface GameStatus {
  state: GameState;
  scoreAchieved: number;
}
