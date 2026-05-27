import { Injectable } from '@angular/core';
import { WordDifficultyResponse } from '../../../data/dto/response/word-difficulty-response';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultyService {
  static readonly INITIAL_DIFFICULTY_NAME: string = 'fácil';

  difficulties: WordDifficultyResponse[] = [];
  currentDifficulty: WordDifficultyResponse | null = null;

  hasDifficulties(): boolean {
    return this.difficulties.length > 0;
  }

  containsByName(name: string): boolean {
    return this.difficulties.some((d) => d.name === name);
  }

  setDifficulties(difficulties: WordDifficultyResponse[]): void {
    this.difficulties = difficulties;
    this.setCurrentDifficultyByName(WordDifficultyService.INITIAL_DIFFICULTY_NAME);
  }

  setCurrentDifficulty(diff: WordDifficultyResponse): void {
    this.currentDifficulty = diff;
  }

  setCurrentDifficultyByName(name: string): void {
    this.setCurrentDifficulty(this.getByName(name));
  }

  getByName(name: string): WordDifficultyResponse {
    const difficulty = this.difficulties.find((d) => d.name === name);

    if (!difficulty) throw new Error(`Dificuldade '${name}' não encontrada.`);
    return difficulty;
  }
}
