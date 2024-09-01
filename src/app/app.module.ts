import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DsfrAlertModule,
  DsfrBadgeModule,
  DsfrButtonModule,
  DsfrButtonsGroupModule,
  DsfrFormEmailModule,
  DsfrFormFieldsetModule,
  DsfrFormInputModule,
  DsfrFormPasswordModule,
  DsfrHeaderModule,
  DsfrLoginComponent,
  DsfrTableModule,
} from '@edugouvfr/ngx-dsfr';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { DateComponent } from './components/date/date.component';
import { PriceComponent } from './components/price/price.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { TransactionsService } from './services/transactions.service';
import { UserComponent } from './user/user.component';
import { UserDisplayPipe } from './pipes/user-display.pipe';

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
    TransactionsTableComponent,
    UserDisplayPipe,
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
    DsfrBadgeModule,
    DsfrTableModule,
  ],
  providers: [
    AuthService,
    CookieService,
    PermissionsService,
    TransactionsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
