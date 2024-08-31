import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginValues, RegisterValues } from '@app/core/types/authType';
import { ENVIRONNEMENT } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_DURATION = 3600000; // 1 hour

export interface UserInfo {
  id: number;
  first: string;
  last: string;
  email: string;
  password: string;
  created: Date;
  initial_balance: number;
}

interface UserToken {
  user: UserInfo;
  accessToken: string;
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
    private router: Router,
  ) {}

  //to add case where ther is no token redirect to error page
  getAuthorizationToken(): string | undefined {
      if(!this.cookieService.check('userToken')) return undefined;
      return JSON.parse(this.cookieService.get('userToken')).accessToken;
  }

  WhoAmI(): UserInfo {
    return JSON.parse(this.cookieService.get('userToken')).user;
  }

  Logout() {
    if(this.cookieService.check('userToken')) {
      this.cookieService.delete('userToken');
      this.router.navigate(['/login']);
    }
  }

  Login(inputdata: LoginValues) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.loginURL, {
          ...inputdata,
        })
        .subscribe({
          next: (returnValue: any) => {
            this.cookieService.set(
              'userToken',
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
              'userToken',
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
