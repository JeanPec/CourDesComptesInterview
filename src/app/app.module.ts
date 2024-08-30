import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DsfrAlertModule,
  DsfrButtonModule,
  DsfrButtonsGroupModule,
  DsfrFormEmailModule,
  DsfrFormFieldsetModule,
  DsfrFormInputModule,
  DsfrFormPasswordModule,
  DsfrHeaderModule,
  DsfrLoginComponent,
  DsfrTagModule,
} from '@edugouvfr/ngx-dsfr';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { UserComponent } from './user/user.component';
import { DateComponent } from './components/date/date.component';
import { PriceComponent } from './components/price/price.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    PrivateLayoutComponent,
    HeaderComponent,
    PriceComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DsfrAlertModule,
    DsfrLoginComponent,
    DsfrButtonsGroupModule,
    DsfrFormFieldsetModule,
    DsfrFormEmailModule,
    DsfrFormInputModule,
    DsfrFormPasswordModule,
    DsfrButtonsGroupModule,
    DsfrButtonModule,
    DsfrHeaderModule,
    DsfrTagModule,
  ],
  providers: [AuthService, CookieService, PermissionsService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
