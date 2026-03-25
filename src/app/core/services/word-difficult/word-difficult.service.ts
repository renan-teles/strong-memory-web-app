import { Injectable } from '@angular/core';
import { IWordDifficultyData } from '../../../shared/models/word-difficulty-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WordDifficultService {
  currentDifficulty!: IWordDifficultyData;

  readonly difficults: IWordDifficultyData[] = [
    {
      translation: 'Fácil',
      difficulty: 'easy',
      maxQuantityWords: 15,
      increaseDisplayTimeSeconds: 5,
      increaseTypingTimeSeconds: 5,
    },
    {
      translation: 'Normal',
      difficulty: 'normal',
      maxQuantityWords: 25,
      increaseDisplayTimeSeconds: 3,
      increaseTypingTimeSeconds: 3,
    },
    {
      translation: 'Difícil',
      difficulty: 'hard',
      maxQuantityWords: 40,
      increaseDisplayTimeSeconds: 2,
      increaseTypingTimeSeconds: 2,
    },
  ];

  constructor() {
    this.currentDifficulty = this.getDifficultByName('easy')!;
  }

  getDifficultByName(name: string): IWordDifficultyData | undefined {
    return this.difficults.find((d) => d.difficulty === name);
  }

  setCurrentDifficulty(diff: IWordDifficultyData): void {
    this.currentDifficulty = diff;
  }
}
