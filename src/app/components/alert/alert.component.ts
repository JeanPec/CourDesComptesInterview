import { Component, OnInit } from '@angular/core';
import { AlertPayload, AlertService } from '@app/services/alert.service';

const TIME_OUT = 5000;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alerts: AlertPayload[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(
      ({
        heading,
        message,
        severity,
        closeControlLabel,
      }) => {
        this.alerts.push({ heading, message, severity, closeControlLabel });
        setTimeout(() => {
          this.remove(0);
        }, TIME_OUT); // Adjust the timeout as needed
      },
    );
  }

  remove(index: number) {
    this.alerts.splice(index, 1);
    console.log(this.alerts);
  }
}
