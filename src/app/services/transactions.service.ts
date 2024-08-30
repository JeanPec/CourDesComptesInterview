import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONNEMENT } from '@environments/environment';

interface Transaction {
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

  constructor(private http: HttpClient) {}

  async updatedSum(userId: number, baseSum: number) {
    let userSum = baseSum;
    //dépenses
    const paramsDepenses = new HttpParams().set('fromUserId', userId);
    await new Promise<void>((resolve, reject) => {
      this.http.get(this.transactionURL, { params: paramsDepenses }).subscribe({
        next: (returnValue: any) => {
          const transactions = returnValue as Transaction[];
          console.log(transactions);
          transactions.forEach(({amount}) => {
            userSum -=amount;
          });
          resolve();
        },
        error: (error) => reject(error),
      });
    });
    //gains
    const paramsGains = new HttpParams().set('toUserId', userId);
    await new Promise<void>((resolve, reject) => {
      this.http.get(this.transactionURL, { params: paramsGains }).subscribe({
        next: (returnValue: any) => {
          const transactions = returnValue as Transaction[];
          transactions.forEach(({amount}) => {
            userSum +=amount;
          });
          resolve();
        },
        error: (error) => reject(error),
      });
    });
    console.log(userSum);
    return userSum;
  }
}
