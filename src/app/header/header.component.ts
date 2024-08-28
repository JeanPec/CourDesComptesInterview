import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { DsfrLink } from '@edugouvfr/ngx-dsfr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private service: AuthService) {}

  linkSelect(item: DsfrLink) {
    this.service.Logout();
  }
}
