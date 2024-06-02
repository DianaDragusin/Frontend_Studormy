import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddRoomRequest} from "../../models/AddRoomRequest";
import {Observable} from "rxjs";
import {AddRoomResponse} from "../../models/AddRoomResponse";
import {AddDormitoryResponse} from "../../models/AddDormitoryResponse";

@Injectable({
  providedIn: 'root'
})
export class DormitoryService {
  url: string = 'http://localhost:8080/api/dormitory';
  constructor(private http: HttpClient) {}
  addDormitory(id: number,name: string): Observable<AddDormitoryResponse>{
    return this.http.post<AddDormitoryResponse>(`${this.url}/admin/` + id ,name);
  }
}
