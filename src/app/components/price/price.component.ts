import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {
  @Input() price: number = 0;
  priceToShow: string = '0€';

  ngOnChanges() {
    const euro = Math.floor(this.price / 100); 
    const cents = this.price - euro * 100;
    this.priceToShow = `${euro},${cents} €`;
  }
}
