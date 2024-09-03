import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loader" [style.height]="height" [style.width]="width">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() height: string = '400px';
  @Input() width: string = '400px';
}