import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  dataSource$: Observable<User[]> = of([]);
  displayedColumns: string[] = ['fullName', 'email', 'ci', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.userService.getAllUsers();
  }

  deleteUser(id: string) {
    this.userService
      .delete(id)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edited')
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          data: {
            message: 'Usuario Editado',
            icon: 'check',
            iconColor: 'green',
          },
        });
    });
  }
}
