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
  private userId: number | null = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!) : null;


  constructor(private http: HttpClient) {}

  login(loginModel: LoginModel): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email: loginModel.email,
      password: loginModel.password,
    };
    let loginEndpoint = loginModel.role === UserRole.Student ? 'student' : 'admin';
    return this.http.post<LoginResponse>(this.url + 'login/' + loginEndpoint, loginRequest)
      .pipe(
        tap((response) => {
          this.isLoggedIn = true;
          this.userId = response.id;
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userId',response.id.toString() );
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userId = null;
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    // Optionally update the isLoggedIn state based on the session storage
    // in case it gets out of sync, for example when session storage is cleared manually
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return this.isLoggedIn;
  }

  // If you need to get the userId from other parts of your application
  getUserId(): number | null {
    return this.userId;

  }
}
