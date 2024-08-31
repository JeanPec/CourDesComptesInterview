import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONNEMENT } from '@environments/environment';
import { AlertService } from './alert.service';

export interface Transaction {
  id: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  transactionURL = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.transactions;
  transactions: Transaction[] | undefined = undefined;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {}

  refreshTransactions() {
    return new Promise<void>((resolve, reject) => {this.http.get(this.transactionURL).subscribe({
      next: (returnValue: any) => {
        this.transactions = returnValue as Transaction[];
        resolve();
      },
      error: (error) => {this.alertService.showAlert('Transaction Error', error); reject(error)},
    });
  });
  }

  async getUserTransactions(userId: number) {
    if(!this.transactions) await this.refreshTransactions();
    return this.transactions ? this.transactions.filter(
      ({ fromUserId, toUserId }) =>
        fromUserId === userId || toUserId === userId,
    ) : [];
  }

  updatedSum(userId: number, baseSum: number) {
    this.refreshTransactions();
    return this.transactions ? this.transactions.reduce(
      (accumulator, { amount, fromUserId, toUserId }) => {
        if (fromUserId === toUserId) return accumulator;
        if (fromUserId === userId) return accumulator - amount;
        if (toUserId === userId) accumulator + amount;
        return accumulator;
      },
      baseSum,
    ) : 0;
  }
}
