import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
  userData = inject(MAT_DIALOG_DATA).user;
  editUserForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    ci: [undefined, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
  });

  constructor() {}

  ngOnInit(): void {
    const { firstName, lastName, ci, email, role } = this.userData;
    this.editUserForm.patchValue({
      firstName,
      lastName,
      ci,
      email,
      role,
    });
  }

  onSubmit() {
    if (this.editUserForm.invalid) return;
  }
}
