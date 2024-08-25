import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD } from '@app/core/constants/apps';
import { AlertService } from '@app/services/alert.service';
import { AuthService } from '@app/services/auth.service';
import { DsfrLoginComponent } from '@edugouvfr/ngx-dsfr/lib/pages/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm!: FormGroup;

  readonly userPassword = PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private service: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  signIn() {
    console.log(event)
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.service
      .Login({
        email,
        password,
      })
      .then(
        () => {
          this.router.navigate(['/user']);
        },
        (error) => {
          this.alertService.showAlert('Error', error, 'error');
        },
      );
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }
}
