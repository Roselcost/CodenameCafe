import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tocommadecimal',
})
export class ToCommaDecimal implements PipeTransform {
  public transform(value: number | null): string {
    return value
      ? value.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '';
  }
}
