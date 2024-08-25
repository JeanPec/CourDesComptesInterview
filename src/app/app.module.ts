import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { UserComponent } from './user/user.component';
import { CookieService } from 'ngx-cookie-service';
import { AlertComponent } from './components/alert/alert.component';
import { DsfrAlertModule } from '@edugouvfr/ngx-dsfr';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DsfrAlertModule
  ],
  providers: [AuthService, CookieService, PermissionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
