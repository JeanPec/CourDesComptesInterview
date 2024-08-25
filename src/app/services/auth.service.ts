import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginValues, RegisterValues } from '@app/core/types/authType';
import { ENVIRONNEMENT } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_DURATION = 3600000; // 1 hour

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

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  Login(inputdata: LoginValues) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.loginURL, {
          ...inputdata,
        })
        .subscribe({
          next: (returnValue: any) => {
            this.cookieService.set(
              'userInfo',
              JSON.stringify(returnValue),
              new Date(Date.now() + TOKEN_DURATION),
            );
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
            this.cookieService.set(
              'userInfo',
              JSON.stringify(returnValue),
              new Date(Date.now() + TOKEN_DURATION),
            );
            resolve();
          },
          error: (error) => reject(error),
        });
    });
  }
}
