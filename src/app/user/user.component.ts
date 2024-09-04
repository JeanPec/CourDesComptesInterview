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
  String: any;
  constructor(private authService: AuthService, private transactions: TransactionsService) {
    this.String = String;
  }

  async ngOnInit() {
    this.user = this.authService.WhoAmI();
    this.userSum = await this.transactions.updatedSum(this.user.id, this.user.initial_balance);
  }

  linkSelect() {
    this.authService.Logout();
  }}
