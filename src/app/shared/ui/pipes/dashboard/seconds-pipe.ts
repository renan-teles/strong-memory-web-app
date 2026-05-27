import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seconds',
})
export class SecondsPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals: number = 1): string {
    if (value == null) {
      return '0s';
    }
    return `${value.toFixed(decimals)}s`;
  }
}
