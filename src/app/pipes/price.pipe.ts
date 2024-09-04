import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    const euro = Math.floor(price / 100); 
    const cents = price - euro * 100;
    return `${euro},${cents} €`;
  }
}
