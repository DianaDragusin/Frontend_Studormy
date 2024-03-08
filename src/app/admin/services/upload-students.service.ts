import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../auth/models/loginModel";
import {Observable} from "rxjs";
import {LoginResponse} from "../../auth/models/loginResponse";
import {LoginRequest} from "../../auth/models/loginRequest";
import {UserRole} from "../../auth/enums/userRole";
import {StudentRequest} from "../models/studentRequest";
import {StudentResponse} from "../models/studentResponse";

@Injectable({
  providedIn: 'root'
})
export class UploadStudentsService {

  url: string = 'http://localhost:8080/api/student';

  constructor(  private http: HttpClient) {

  }

 addStudents( adminId: number ,students:StudentRequest[]): Observable<StudentResponse[]> {
     return this.http.post<StudentResponse[]>(`${this.url}/uploadStudents/` + adminId,  students );
 }

}
