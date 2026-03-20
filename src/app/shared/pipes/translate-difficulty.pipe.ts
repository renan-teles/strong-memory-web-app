import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDifficulty',
  standalone: true,
})
export class TranslateDifficultyPipe implements PipeTransform {
  transform(value: string): string {
    const translateMap = new Map()
      .set('easy', 'Fácil')
      .set('normal', 'Normal')
      .set('hard', 'Difícil');

    if (!translateMap.has(value)) {
      return value;
    }
    return translateMap.get(value);
  }
}
