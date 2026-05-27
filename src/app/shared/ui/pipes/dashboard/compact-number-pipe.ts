import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compactNumber',
})
export class CompactNumberPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals: number = 1): string {
    if (value == null) {
      return '0';
    }

    return Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      maximumFractionDigits: decimals,
    }).format(value);
  }
}
