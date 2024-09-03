import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatService } from '@app/services/date-format.service';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  constructor(private dateService: DateFormatService) {}

  transform(value: string): string {
    return this.dateService.formatDate(value);
  }
}
