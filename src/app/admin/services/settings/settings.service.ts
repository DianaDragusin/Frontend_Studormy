import { Injectable } from '@angular/core';
import {AddRoomRequest} from "../../models/AddRoomRequest";
import {Observable} from "rxjs";
import {AddRoomResponse} from "../../models/AddRoomResponse";
import {HttpClient} from "@angular/common/http";
import {GetSettingsResponse} from "../../models/GetSettingsResponse";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  url: string = 'http://localhost:8080/api/settings';

  constructor(private http: HttpClient) {}
  addSettingEntity(id: number, startAllocation:Boolean): Observable<GetSettingsResponse>{
    return this.http.post<GetSettingsResponse>(`${this.url}/admin/` + id ,startAllocation);
  }
  putSettings(id:number,endAllocation: Boolean): Observable<GetSettingsResponse>{
    return this.http.put<GetSettingsResponse>(`${this.url}/admin/` + id,endAllocation );
  }
  getSettings(id: number): Observable<GetSettingsResponse>{
    return this.http.get<GetSettingsResponse>(`${this.url}/admin/` + id );
  }
}
