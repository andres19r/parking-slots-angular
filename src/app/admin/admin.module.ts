import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, MaterialModule],
})
export class AdminModule {}
