import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetStudentResponse} from "../../student/models/GetStudentResponse";
import {UpdateStudentRequest} from "../../student/models/UpdateStudentRequest";
import {GetAdminResponse} from "../models/adminResponse";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}
  getAdmin(adminId: number): Observable<GetAdminResponse>{
    return this.http.get<GetAdminResponse>(`${this.url}/` + adminId );
  }
  getAdminByDormitory(id: number): Observable<GetAdminResponse>{
    return this.http.get<GetAdminResponse>(`${this.url}/dormitory/` + id );
  }


}
