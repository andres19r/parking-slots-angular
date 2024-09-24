import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  dataSource$: Observable<User[]> = of([]);
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'ci',
    'role',
    'actions',
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource$ = this.userService.getAllUsers();
  }

  deleteUser(id: string) {
    this.userService
      .delete(id)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  }
}
