import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetAdminResponse} from "../../models/adminResponse";
import {AddRoomRequest} from "../../models/AddRoomRequest";
import {AddRoomResponse} from "../../models/AddRoomResponse";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url: string = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}
  addRoom(id: number, addRoomRequest:AddRoomRequest): Observable<AddRoomResponse>{
    return this.http.post<AddRoomResponse>(`${this.url}/dormitory/` + id ,addRoomRequest);
  }
  getRoom(roomId: number): Observable<AddRoomResponse>{
    return this.http.get<AddRoomResponse>(`${this.url}/` + roomId );
  }
  getMaxRoomNr(id: number): Observable<number>{
    return this.http.get<number>(`${this.url}/max/` + id );
  }
  getMaxCapacity(id: number): Observable<number>{
    return this.http.get<number>(`${this.url}/maxCapacity/` + id );
  }
  getAllRooms(id: number):Observable<AddRoomResponse[]>{
    return this.http.get<AddRoomResponse[]>(`${this.url}/dormitory/`+ id );
  }
  getAllVacantRooms(id: number):Observable<AddRoomResponse[]>{
    return this.http.get<AddRoomResponse[]>(`${this.url}/vacant/dormitory/`+ id );
  }

}
