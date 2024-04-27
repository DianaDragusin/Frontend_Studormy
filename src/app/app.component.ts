import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-studormy';
  constructor(private auth: AuthService) {}
  isloggedIn():boolean{
    return this.auth.isAuthenticated();
  }
}
