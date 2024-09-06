export type FilterKey = 'type' | 'amount' | 'creditor' | 'benefactor' | 'date';

export interface FilterInput {
    type: FilterKey,
    value: any,
  }