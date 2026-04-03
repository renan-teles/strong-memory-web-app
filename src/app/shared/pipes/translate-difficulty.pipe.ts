import { inject, Pipe, PipeTransform } from '@angular/core';
import { WordDifficultyService } from '../../core/services/word-difficulty/word-difficulty.service';
import { IWordDifficultyData } from '../models/word-difficulty-data.interface';

@Pipe({
  name: 'translatedifficulty',
  standalone: true,
})
export class TranslateDifficultyPipe implements PipeTransform {
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  transform(value: string): string {
    const difficulty: IWordDifficultyData | undefined =
      this.difficultyService.getDifficultByName(value);

    if (!difficulty) return value;
    return difficulty.translation;
  }
}
