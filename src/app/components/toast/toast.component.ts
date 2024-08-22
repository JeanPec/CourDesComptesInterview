import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  displayToast: boolean = false;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast$.subscribe((message) => {
      this.message = message;
      this.displayToast = true;
      setTimeout(() => {
        this.displayToast = false;
      }, 3000); // Adjust the timeout as needed
    });
  }
}