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

export enum Direction {
  DESC,
  ASC,
}

export interface Sort {
  key: string;
  order: Direction
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
    return new Promise<void>((resolve, reject) => {
      this.http.get(this.transactionURL).subscribe({
        next: (returnValue: any) => {
          this.transactions = returnValue as Transaction[];
          resolve();
        },
        error: (error) => {
          this.alertService.showAlert('Transaction Error', error);
          reject(error);
        },
      });
    });
  }

  async getUserTransactions(userId: number, pageNumber: number, numberDisplay: number, activeSort: Sort) {
    if (!this.transactions) await this.refreshTransactions();

    if (this.transactions) {
      const table = this.transactions.filter(
        ({ fromUserId, toUserId }) =>
          fromUserId === userId || toUserId === userId,
      ).sort((transaction1, transaction2) => {
        let a: any = 0, b: any = 0;
        switch(activeSort.key) {
          case 'type': {
            if(activeSort.order === Direction.ASC) {
              a = transaction1.fromUserId === userId ? 1 : 0;
              b = transaction2.fromUserId === userId ? 1 : 0;
            } else {
              a = transaction1.toUserId === userId ? 1 : 0;
              b = transaction2.toUserId === userId ? 1 : 0;
            }
            break;
          }
          case 'amount': {
            if(activeSort.order === Direction.ASC) {
              a = transaction1.amount;
              b = transaction2.amount;
            } else {
              a = transaction2.amount;
              b = transaction1.amount;
            }
            break;
          }
          default:
          case 'date': {
            if(activeSort.order === Direction.ASC) {
              a = new Date(transaction1.date);
              b = new Date(transaction2.date);
            } else {
              a = new Date(transaction2.date);
              b = new Date(transaction1.date);
            }
            break;
          }
        }
        return a-b;
      });

      return {
        table: table.slice(
          pageNumber * numberDisplay,
          (pageNumber + 1) * numberDisplay,
        ),
        total: table?.length,
      };
    }

    return {
      table: [],
      total: 0,
    };
  }

  async updatedSum(userId: number, baseSum: number) {
    if (!this.transactions) await this.refreshTransactions();
    return this.transactions
      ? this.transactions.reduce(
          (accumulator, { amount, fromUserId, toUserId }) => {
            if (fromUserId === toUserId) return accumulator;
            if (fromUserId === userId) return accumulator - amount;
            if (toUserId === userId) accumulator + amount;
            return accumulator;
          },
          baseSum,
        )
      : 0;
  }
}
