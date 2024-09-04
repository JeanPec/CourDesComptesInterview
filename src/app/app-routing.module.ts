import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/permissions.service';
import { UserComponent } from './user/user.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

const routes: Routes = [
  {
    title: 'login',
    path: 'login',
    component: LoginComponent,
  },
  {
    title: 'register',
    path: 'register',
    component: RegisterComponent,
  },
  {
    title: 'private-layout',
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', title: 'user', component: UserComponent },
      { path: 'transaction', title: 'new-transaction', component: NewTransactionComponent },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
