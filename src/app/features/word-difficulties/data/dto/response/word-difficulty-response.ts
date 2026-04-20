export interface WordDifficultyResponse {
  id: number;
  translation: string;
  difficulty: string;
  maxQuantityWords: number;
  increaseDisplayTimeSeconds: number;
  increaseTypingTimeSeconds: number;
}
