import { inject, Pipe, PipeTransform } from '@angular/core';
import { WordDifficultyResponse } from '../../../features/word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyService } from '../../../features/word-difficulties/presentation/services/word-difficulty/word-difficulty.service';

@Pipe({
  name: 'translatedifficulty',
  standalone: true,
})
export class TranslateDifficultyPipe implements PipeTransform {
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  transform(value: string): string {
    const difficulty: WordDifficultyResponse | undefined =
      this.difficultyService.getDifficultByName(value);

    if (!difficulty) return value;
    return difficulty.translation;
  }
}
