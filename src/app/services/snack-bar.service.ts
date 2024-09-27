import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, icon: string, iconColor: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message,
        icon,
        iconColor,
      },
    });
  }
}
