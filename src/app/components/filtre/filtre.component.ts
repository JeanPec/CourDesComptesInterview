import { Component, EventEmitter, Output } from '@angular/core';

type FilterKey = 'type' | 'amount' | 'creditor' | 'benefactor' | 'date';

export interface FilterInput {
  type: FilterKey,
  value: any,
}

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss'],
})
export class FiltreComponent {
  activeFilters: Map<FilterKey, FilterInput> = new Map();
  showFilter: FilterKey = 'type';
  @Output() applyFilter = new EventEmitter<{ type: string, value: any }>();

  changeFilter(newFilterToShow: FilterKey) {
    this.showFilter = newFilterToShow;
  }


}
