import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/loginModel";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../models/loginResponse";
import {UserRole} from "../enums/userRole";
import {LoginRequest} from "../models/loginRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:8080/auth/';
  private isLoggedIn: boolean = sessionStorage.getItem('isLoggedIn') === 'true';
  private userId: number  = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!) : -1;
  private role: string  = '' ;

  constructor(private http: HttpClient) {}

  login(loginModel: LoginModel): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email: loginModel.email,
      password: loginModel.password,
    };
    let loginRole = loginModel.role === UserRole.Student ? 'student' : 'admin';
    return this.http.post<LoginResponse>(this.url + 'login/' + loginRole, loginRequest)
      .pipe(
        tap((response) => {
          this.isLoggedIn = true;
          this.userId = response.id;
          this.role = loginRole;
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userId',response.id.toString());
          sessionStorage.setItem('role',loginRole);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userId = -1;
    this.role = '';
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return this.isLoggedIn;
  }

  getUserId(): number {
    if (this.userId === -1) {
      this.userId = parseInt(sessionStorage.getItem('userId') || '-1', 10);
    }
    return this.userId;
  }

  getUserRole(): string {
    if (!this.role) {
      this.role = sessionStorage.getItem('role') || '';
    }
    return this.role;
  }
}
