import { MatchMode } from '../../../domain/enums/match-mode.enum';

export interface StartGameRequest {
  difficulty: string;
  mode: MatchMode;
}
