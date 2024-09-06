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
    private router: Router,
  ) {}

  //to add case where ther is no token redirect to error page
  getAuthorizationToken(): string | undefined {
    const token = sessionStorage.getItem('userToken');
    if(!token) return undefined;
    return JSON.parse(token).accessToken;
  }

  WhoAmI(): UserInfo {
    const token = sessionStorage.getItem('userToken');
    if(!token) throw new Error('User is not logged');
    return JSON.parse(token).user;
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  Login(inputdata: LoginValues) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.loginURL, {
          ...inputdata,
        })
        .subscribe({
          next: (returnValue: any) => {
            sessionStorage.setItem('userToken', 
              JSON.stringify(returnValue))
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
              sessionStorage.setItem('userToken', 
              JSON.stringify(returnValue))
            resolve();
          },
          error: (error) => reject(error),
        });
    });
  }
}
