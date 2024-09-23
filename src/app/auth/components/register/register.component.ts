import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { User, UserRole } from '../../../models/user';
import { AuthfireService } from '../../../services/authfire.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private firestoreService = inject(FirestoreService);
  private router = inject(Router);
  private authFire = inject(AuthfireService);

  regiterForm = this.formBuilder.group({
    firstName: ['name', Validators.required],
    lastName: ['last', Validators.required],
    ci: [12345, Validators.required],
    email: ['user@email.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
  });
  constructor() {}

  onSubmit() {
    if (this.regiterForm.invalid) return;

    const { firstName, lastName, ci, email, password } = this.regiterForm.value;
    const newUser = new User(firstName!, lastName!, ci!, email!, UserRole.USER);
    this.firestoreService
      .createUser(newUser)
      .then((user) => {
        console.log(user);
        return this.authFire.register(email!, password!);
      })
      .then(() => {
        this.router.navigateByUrl('/parking');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
