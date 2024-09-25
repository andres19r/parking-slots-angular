import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule],
})
export class ParkingModule {}
