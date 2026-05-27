import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || value <= 0) {
      return '0s';
    }

    const totalSeconds = Math.floor(value / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}min ${seconds}s`;
    }

    if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    }

    return `${seconds}s`;
  }
}
