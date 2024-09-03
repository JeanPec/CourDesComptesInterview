import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  constructor() {}

  formatDate(dateInput: string): string {
    const date = new Date(dateInput);
    const offset = date.getTimezoneOffset() * 60 * 1000;

    return new Date(date.getTime() + offset).toLocaleString(
      'fr-FR',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    );
  }
}
