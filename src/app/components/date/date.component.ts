import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent {
  @Input() date = new Date();
  dateToShow = new Date();

  constructor() {
    // Get the local time zone offset in milliseconds
    const offset = this.date.getTimezoneOffset() * 60 * 1000;

    // Create a new Date object representing the local time
    this.dateToShow = new Date(this.date.getTime() + offset);
  }
}
