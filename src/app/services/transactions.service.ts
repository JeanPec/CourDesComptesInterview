import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONNEMENT } from '@environments/environment';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { UsersService } from './users.service';
import { FilterInput } from '@app/core/types/filter';

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
  order: Direction;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  transactionURL = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.transactions;
  transactions: Transaction[] | undefined = undefined;
  activeSort: Sort | undefined = undefined;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UsersService,
  ) {}

  fetchTransactions(userId: number, filters: FilterInput[], newSort?: Sort) {
    return new Promise<void>((resolve, reject) => {
      this.http.get(this.transactionURL).subscribe({
        next: (returnValue: any) => {
          let table = (returnValue as Transaction[]).filter(
            ({ fromUserId, toUserId }) =>
              fromUserId === userId || toUserId === userId,
          );
          filters.forEach((filter) => {
            table = table.filter((element) =>
              this.filterElements(userId, element, filter),
            );
          });
          if (newSort) {
            table = table.sort((transaction1, transaction2) => {
              return this.sortElements(
                userId,
                transaction1,
                transaction2,
                newSort,
              );
            });
            //special case to put the user in last position when sorting benefactor or creditor
            if (newSort.key === 'creditor' || newSort.key === 'benefactor') {
              const filteredArray: Transaction[] = [];
              const valueArray: Transaction[] = [];
              table.forEach((element) => {
                if (
                  (newSort.key === 'creditor' && element.toUserId === userId) ||
                  (newSort.key === 'benefactor' &&
                    element.fromUserId === userId)
                )
                  valueArray.push(element);
                else filteredArray.push(element);
              });
              table = valueArray.concat(filteredArray);
            }
          }
          this.transactions = table;
          resolve();
        },
        error: (error) => {
          this.alertService.showAlert('Transaction Error', error);
          reject(error);
        },
      });
    });
  }

  private filterElements(
    userId: number,
    element: Transaction,
    filter: FilterInput,
  ) {
    const value = filter.value;
    switch (filter.type) {
      case 'type': {
        const type = value.type;
        if (type === 'debit') return element.toUserId === userId;
        else return element.fromUserId === userId;
      }
      case 'amount': {
        const lowerAmount = value.lowerAmount;
        const upperAmount = value.upperAmount;
        return element.amount >= lowerAmount && element.amount <= upperAmount;
      }
      case 'creditor': {
        const { first } = this.userService.getUserFromId(element.fromUserId);
        const firstName = String(value.first);
        return firstName.includes(first);
      }
      case 'benefactor': {
        const { first } = this.userService.getUserFromId(element.toUserId);
        const firstName = value.first;
        return first === firstName;
      }
      default:
      case 'date': {
        const dateBefore = new Date(value.dateBefore);
        const dateAfter = new Date(value.dateAfter);
        const date = new Date(element.date);
        return date >= dateBefore && date <= dateAfter;
      }
    }
  }

  private sortElements(
    userId: number,
    transaction1: Transaction,
    transaction2: Transaction,
    activeSort: Sort,
  ) {
    let a: any = 0,
      b: any = 0;
    switch (activeSort.key) {
      case 'type': {
        if (activeSort.order === Direction.ASC) {
          a = transaction1.fromUserId === userId ? 1 : 0;
          b = transaction2.fromUserId === userId ? 1 : 0;
        } else {
          a = transaction1.toUserId === userId ? 1 : 0;
          b = transaction2.toUserId === userId ? 1 : 0;
        }
        break;
      }
      case 'amount': {
        if (activeSort.order === Direction.ASC) {
          a = transaction1.amount;
          b = transaction2.amount;
        } else {
          a = transaction2.amount;
          b = transaction1.amount;
        }
        break;
      }
      case 'creditor': {
        if (activeSort.order === Direction.ASC) {
          a = this.userService.getUserFromId(transaction1.fromUserId).first;
          b = this.userService.getUserFromId(transaction2.fromUserId).first;
        } else {
          a = this.userService.getUserFromId(transaction2.fromUserId).first;
          b = this.userService.getUserFromId(transaction1.fromUserId).first;
        }
        return a.localeCompare(b);
      }
      case 'benefactor': {
        if (activeSort.order === Direction.ASC) {
          a = this.userService.getUserFromId(transaction1.toUserId).first;
          b = this.userService.getUserFromId(transaction2.toUserId).first;
        } else {
          a = this.userService.getUserFromId(transaction2.toUserId).first;
          b = this.userService.getUserFromId(transaction1.toUserId).first;
        }
        return a.localeCompare(b);
      }
      default:
      case 'date': {
        if (activeSort.order === Direction.ASC) {
          a = new Date(transaction1.date);
          b = new Date(transaction2.date);
        } else {
          a = new Date(transaction2.date);
          b = new Date(transaction1.date);
        }
        break;
      }
    }
    return a - b;
  }

  async getUserTransactions(
    userId: number,
    pageNumber: number,
    numberDisplay: number,
    newSort: Sort,
    filters: FilterInput[],
    forceUpdate: boolean = false,
  ) {
    if (!this.transactions || this.activeSort !== newSort || forceUpdate)
      await this.fetchTransactions(userId, filters, newSort);
    this.activeSort = newSort;
    if (this.transactions) {
      return {
        table: this.transactions.slice(
          pageNumber * numberDisplay,
          (pageNumber + 1) * numberDisplay,
        ),
        total: this.transactions?.length,
      };
    }

    return {
      table: [],
      total: 0,
    };
  }

  async updatedSum(userId: number, baseSum: number) {
    if (!this.transactions) await this.fetchTransactions(userId, []);
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

  submitTransaction(
    sendId: number,
    amount: number,
    receiverId: number,
  ): Observable<Object> {
    const data = {
      fromUserId: sendId,
      toUserId: receiverId,
      amount,
    };
    return this.http.post(this.transactionURL, data);
  }
}
