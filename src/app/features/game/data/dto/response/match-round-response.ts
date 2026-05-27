import { MatchRoundStatus } from '../../../domain/enums/match-round-status.enum';
import { TypedWordResponse } from './typed-word-response';

export interface MatchRoundResponse {
  status: MatchRoundStatus;
  order: number;
  startAt: string;
  endAt: string;
  typedWords: TypedWordResponse[];
}
