import { Component } from '@angular/core';
import { AuthfireService } from './services/authfire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private afAuth: AuthfireService) {
    this.afAuth.initAuthListener();
  }
}
