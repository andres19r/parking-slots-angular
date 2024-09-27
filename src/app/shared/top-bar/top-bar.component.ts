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

  get user() {
    return this.authFire.user;
  }

  logout() {
    this.authFire.logout().then(() => this.router.navigateByUrl('/auth/login'));
  }

  goTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
