import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [TopBarComponent, SnackBarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [TopBarComponent]
})
export class SharedModule {}
