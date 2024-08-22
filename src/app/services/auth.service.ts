import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginValues, RegisterValues } from '@app/core/types/authType';
import { ENVIRONNEMENT } from '@environments/environment';

interface userInfo {
  user: {
    id: number;
    first: string;
    last: string;
    email: string;
    password: string;
    created: string;
    initial_balance: number;
  };
  accessToken: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.login;
  registerURL = ENVIRONNEMENT.baseUrl + ENVIRONNEMENT.urls.register;
  private userInfo: userInfo | null = null;

  constructor(private http: HttpClient) {}

  Proceedregister(inputdata: RegisterValues) {
    console.log(inputdata);
  }

  Login(inputdata: LoginValues) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.loginURL, {
          ...inputdata,
        })
        .subscribe({
          next: (returnValue: any) => {
            this.userInfo = returnValue;
            localStorage.setItem('userInfo', JSON.stringify(returnValue));
            resolve();
          },
          error: (error) => reject(error),
        });
    });
  }

  Register(inputdata: RegisterValues) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.registerURL, {
          ...inputdata,
        })
        .subscribe({
          next: (returnValue: any) => {
            this.userInfo = returnValue;
            localStorage.setItem('userInfo', JSON.stringify(returnValue));
            resolve();
          },
          error: (error) => reject(error),
        });
    });
  }
}
