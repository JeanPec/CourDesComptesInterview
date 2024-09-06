import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD } from '@app/core/constants/apps';
import { AlertPayload, AlertService } from '@app/services/alert.service';
import { AuthService } from '@app/services/auth.service';
import { DsfrLoginComponent } from '@edugouvfr/ngx-dsfr/lib/pages/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm!: FormGroup;
  alert : AlertPayload | null = null;

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
          this.alert = { heading: "Error", message: error.error, severity: 'error', closeControlLabel: 'Fermez'};
        },
      );
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }
}
