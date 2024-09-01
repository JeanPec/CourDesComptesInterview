import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONNEMENT } from '@environments/environment';
import { AlertService } from './alert.service';
import { first } from 'rxjs';

export interface User {
  id: number;
  first: string;
  last: string;
  email: string;
  created: Date;
  initial_balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userURl = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.users;
  users: Map<number, User> = new Map();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    this.getUsers();
  }


  getUsers() {
      this.http.get(this.userURl).subscribe({
        next: (returnValue: any) => {
          const users = returnValue as User[];
          users.map((user) => {
            this.users.set(user.id, user);
          });
        },
        error: (error) => {
          this.alertService.showAlert('User Error', error);
        },
      });
  }

  getUserFromId(userId: number): User {
    const unknowUser = {
      id: -1,
      first: 'John',
      last: 'Doe',
      email: 'johnDoe@yahoo.fr',
      created: new Date(),
      initial_balance: 5,
    }
    if(!this.users.has(userId)) {
      this.alertService.showAlert('User Error', 'Veuillez rafraichîr la page');
    }
    return this.users.get(userId) ?? unknowUser;
  }
}
