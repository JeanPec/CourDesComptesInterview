import { Pipe, PipeTransform } from '@angular/core';
import { FilterInput } from '@app/components/filtre/filtre.component';
import { DateFormatService } from '@app/services/date-format.service';

@Pipe({
  name: 'filterNames',
})
export class FilterNamesPipe implements PipeTransform {
  constructor(private dateService: DateFormatService) {}

  transform(input: FilterInput): string {
    const value = input.value;
    switch (input.type) {
      case 'type': {
        if (value.type === 'debit') return 'Débit';
        else return 'Crédit';
      }
      case 'amount': {
        return `${value.lowerAmount}€ > Solde > ${value.upperAmount}€`;
      }
      case 'benefactor': {
        return `Bénéficiaire: ${value.first}`;
      }
      case 'creditor': {
        return `Créditeur: ${value.first}`;
      }
      case 'date': {
        return `Date: ${this.dateService.formatDate(value.dateBefore)} : ${this.dateService.formatDate(value.dateAfter)}`;
      }
      default: {
        return 'Inconnu';
      }
    }
  }
}
