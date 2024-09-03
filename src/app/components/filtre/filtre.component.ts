import { Component, EventEmitter, Input, Output } from '@angular/core';

export type FilterKey = 'type' | 'amount' | 'creditor' | 'benefactor' | 'date';

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
  @Output() applyFilter = new EventEmitter<FilterInput[]>();
  Object: any;

  constructor() {
    this.Object = Object;
}

  emitNewFilter() {
    this.applyFilter.emit(Array.from(this.activeFilters, ([_, value]) => (value)) ?? []);
  }

  handleFilterDelete(type: FilterKey) {
    this.activeFilters.delete(type);
    this.emitNewFilter();
  };

  handleFilterUpdate(newFilter: FilterInput) {
    const { type } = newFilter;
    this.activeFilters.set(type, newFilter);
    this.emitNewFilter();
  }

  changeFilter(newFilterToShow: FilterKey) {
    this.showFilter = newFilterToShow;
  }
}
