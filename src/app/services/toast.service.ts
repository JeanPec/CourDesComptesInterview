import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastStyle = 'success' | 'warning' | 'info'| 'danger' | 'default' | 'toast-message';

const TOAST_DURATION = 3000;

export interface ToastPayload {
  message: string;
  toastStyle: ToastStyle;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastPayload>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, toastStyle?: ToastStyle, duration = TOAST_DURATION) {
    this.toastSubject.next({message, toastStyle: toastStyle ?? 'default', duration});
  }

  clearToast() {
    this.toastSubject.complete();
  }
}