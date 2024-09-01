import { Component } from '@angular/core';
import { AuthService, UserInfo } from '@app/services/auth.service';
import { TransactionsService } from '@app/services/transactions.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user: UserInfo | undefined;
  userSum: number = 0;
  constructor(private service: AuthService, private transactions: TransactionsService) {}

  async ngOnInit() {
    this.user = this.service.WhoAmI();
    this.userSum = await this.transactions.updatedSum(this.user.id, this.user.initial_balance);
  }

  linkSelect() {
    this.service.Logout();
  }}
