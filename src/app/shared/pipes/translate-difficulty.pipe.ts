import { inject, Pipe, PipeTransform } from '@angular/core';
import { WordDifficultService } from '../../core/services/word-difficult/word-difficult.service';
import { IWordDifficultyData } from '../models/word-difficulty-data.interface';

@Pipe({
  name: 'translateDifficulty',
  standalone: true,
})
export class TranslateDifficultyPipe implements PipeTransform {
  private readonly difficultyService: WordDifficultService = inject(WordDifficultService);

  transform(value: string): string {
    const difficulty: IWordDifficultyData | undefined =
      this.difficultyService.getDifficultByName(value);

    if (!difficulty) return value;
    return difficulty.translation;
  }
}
