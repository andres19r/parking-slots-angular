import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthfireService } from '../../../services/authfire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authFire = inject(AuthfireService);
  private router = inject(Router);

  regiterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    ci: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor() {}

  onSubmit() {
    if (this.regiterForm.invalid) return;
  }
}
