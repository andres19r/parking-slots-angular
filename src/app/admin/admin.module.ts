import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, MaterialModule, SharedModule],
})
export class AdminModule {}
