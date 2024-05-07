import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetStudentResponse} from "../models/GetStudentResponse";
import {UpdateStudentRequest} from "../models/UpdateStudentRequest";
import {ClusterOceanResponse} from "../models/ClusterOceanResponse";
import {PredictionClusterResponse} from "../models/PredictionClusterResponse";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url: string = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {

  }
  getStudent(studentId: number): Observable<GetStudentResponse>{
    return this.http.get<GetStudentResponse>(`${this.url}/` + studentId );
  }
  getAllStudentsWithSameDormitory(studentId: number): Observable<GetStudentResponse[]>{
    return this.http.get<GetStudentResponse[]>(`${this.url}/no/` + studentId );
  }
  updateStudent(studentId: number, studentData: UpdateStudentRequest): Observable<GetStudentResponse>{
    return this.http.put<GetStudentResponse>(`${this.url}/update/` + studentId, studentData );
  }


}
