import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, EditUserDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
})
export class AdminModule {}
