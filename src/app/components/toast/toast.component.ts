import { Component, OnInit } from '@angular/core';
import { ToastService, ToastStyle } from '@app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toasts: { message: string; toastStyle: ToastStyle[] }[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(({ message, toastStyle, duration }) => {
      this.toasts.push({ message, toastStyle: [toastStyle, 'toast-message'] });
      setTimeout(() => {
        this.remove(0);
      }, duration); // Adjust the timeout as needed
    });
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
    console.log(this.toasts);
  }
}
