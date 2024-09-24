import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  dataSource: User[] = [];
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
    this.userService.initUsersListener().subscribe((users) => {
      this.dataSource = users as User[];
    });
  }
}
