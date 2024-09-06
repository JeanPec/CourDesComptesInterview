import { Component } from '@angular/core';

// We only use this component to guard his children routes
// You need to be connected to access his children
@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent {

}
