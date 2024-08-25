import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD } from '@app/core/constants/apps';
import { AuthService } from '@app/services/auth.service';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage!: string;

  readonly userPassword = PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', []],
      lastName: ['', []],
      age: [, []],
    });
  }

  register() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    const firstname = this.registerForm.get('firstName')?.value;
    const lastname = this.registerForm.get('lastName')?.value;
    const age = this.registerForm.get('age')?.value;


    if (confirmPassword !== password) {
      this.errorMessage =
        "Les deux mots de passe ne correspondent pas, veuillez vérifier qu'ils soient égaux";
      return;
    }
    this.service
      .Register({
        email,
        password,
        firstname,
        lastname,
        age,
      })
      .then(
        () => {
          this.router.navigate(['/user']);
        },
        (error) => {
          this.errorMessage = error;
        },
      );
  }
}
