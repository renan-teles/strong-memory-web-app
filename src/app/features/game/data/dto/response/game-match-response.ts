import { WordDifficultyResponse } from '../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { MatchMode } from '../../../domain/enums/match-mode.enum';
import { MatchResult } from '../../../domain/enums/match-result.enum';
import { DrawnWordResponse } from './drawn-word-response';
import { MatchRoundResponse } from './match-round-response';

export interface GameMatchResponse {
  id: number;
  difficulty: WordDifficultyResponse;
  result: MatchResult;
  mode: MatchMode;
  scoreAchieved: number;
  isDemo: boolean;
  drawnWords: DrawnWordResponse[];
  rounds: MatchRoundResponse[];
}
