import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthfireService } from '../../../services/authfire.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authFire = inject(AuthfireService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.authFire
      .login(email!, password!)
      .then((doc) => {
        doc.subscribe((userInfo) => {
          const user: any = userInfo.data();
          if (user.role === 'admin') {
            return this.router.navigateByUrl('/admin');
          }
          return this.router.navigateByUrl('/parking');
        });
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(
          'Fallo al iniciar sesión',
          'error',
          'red',
        );
      });
  }

  loginWithGoogle() {
    this.authFire
      .loginWithGoogle()
      .then((credentials) => {
        console.log(credentials);
        this.router.navigateByUrl('/parking');
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(
          'Fallo al iniciar sesión',
          'error',
          'red',
        );
      });
  }

  loginWithFacebook() {
    this.authFire
      .loginWithFacebook()
      .then((credentials) => {
        console.log(credentials);
        this.router.navigateByUrl('/parking');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  loginWithX() {
    this.authFire
      .loginWithX()
      .then((credentials) => {
        console.log(credentials);
        this.router.navigateByUrl('/parking');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
