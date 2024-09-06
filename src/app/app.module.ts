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
  DsfrFormRadioModule,
  DsfrHeaderModule,
  DsfrLoginComponent,
  DsfrModalModule,
  DsfrTableModule,
  DsfrTagModule,
  DsfrTagsGroupModule,
} from '@edugouvfr/ngx-dsfr';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { AmountFiltreComponent } from './components/filtre/amount-filtre/amount-filtre.component';
import { DateFiltreComponent } from './components/filtre/date-filtre/date-filtre.component';
import { FiltreComponent } from './components/filtre/filtre.component';
import { TypeFiltreComponent } from './components/filtre/type-filtre/type-filtre.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { UserDisplayPipe } from './pipes/user-display.pipe';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { TransactionsService } from './services/transactions.service';
import { UserComponent } from './user/user.component';
import { FilterNamesPipe } from './pipes/filter-names.pipe';
import { DatePipe } from './pipes/date.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { PricePipe } from './pipes/price.pipe';
import { UserFiltreComponent } from './components/filtre/user-filtre/user-filtre.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    PrivateLayoutComponent,
    HeaderComponent,
    TransactionsTableComponent,
    UserDisplayPipe,
    FiltreComponent,
    TypeFiltreComponent,
    AmountFiltreComponent,
    DateFiltreComponent,
    UserFiltreComponent,
    FilterNamesPipe,
    DatePipe,
    LoadingComponent,
    NewTransactionComponent,
    PricePipe,
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
    DsfrModalModule,
    DsfrFormRadioModule,
    DsfrTagModule,
    DsfrTagsGroupModule,
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
