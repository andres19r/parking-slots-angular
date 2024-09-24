import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '../../../models/user';
import { AuthfireService } from '../../../services/authfire.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authFire = inject(AuthfireService);

  regiterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    ci: [undefined, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor() {}

  onSubmit() {
    if (this.regiterForm.invalid) return;

    const { firstName, lastName, ci, email, password } = this.regiterForm.value;
    this.authFire.register(email!, password!, firstName!, lastName!, ci!, UserRole.USER)
      .then(() => {
        this.router.navigateByUrl('/auth/login');
      })
      .catch((err) => {
        console.error(err);
      });

  }
}
