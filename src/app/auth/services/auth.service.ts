import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/loginModel";
import {Observable} from "rxjs";
import {LoginResponse} from "../models/loginResponse";
import {UserRole} from "../enums/userRole";
import {LoginRequest} from "../models/loginRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:8080/auth/';

  constructor(  private http: HttpClient) {

  }
  login(loginModel: LoginModel): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email: loginModel.email ,
      password: loginModel.password,
    };
    if (loginModel.role == UserRole.Student)
    {
      return this.http.post<LoginResponse>(this.url + 'login/student', loginRequest);
    }
    else
    {
    let  ala = this.http.post<LoginResponse>(this.url + 'login/admin', loginRequest);

    return ala;

    }

  }

}
