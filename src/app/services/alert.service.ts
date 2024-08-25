import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AlertPayload {
  heading: string;
  message: string;
  severity: AlertSeverity;
  closeControlLabel: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<AlertPayload>();
  alert$ = this.alertSubject.asObservable();

  showAlert(
    heading: string,
    message: string,
    severity: AlertSeverity = 'info',
    closeControlLabel: string = 'Fermez',
  ) {
    this.alertSubject.next({ heading, message, severity, closeControlLabel });
  }

  clearAlert() {
    this.alertSubject.complete();
  }
}
