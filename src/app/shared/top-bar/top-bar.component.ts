import { Component } from '@angular/core';
import { AuthfireService } from '../../services/authfire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  constructor(
    private authFire: AuthfireService,
    private router: Router,
  ) {}

  logout() {
    this.authFire.logout();
    this.router.navigateByUrl('/auth/login')
  }
}
