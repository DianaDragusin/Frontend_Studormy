import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddRoomRequest} from "../../models/AddRoomRequest";
import {Observable} from "rxjs";
import {AddRoomResponse} from "../../models/AddRoomResponse";
import {GroupResponse} from "../../../student/models/group/GroupResponse";
import {AddStudentToGroupRequest} from "../../../student/models/group/AddStudentToGroupRequest";

@Injectable({
  providedIn: 'root'
})
export class AutomaticRoomAllocationProcessService {
  url: string = 'http://localhost:8080/api/assignRemainingStudents';

  constructor(private http: HttpClient) {}

  assignRemainingStudentsToVacantRooms(dormitoryId: number):Observable<GroupResponse[]>{
    return this.http.put<GroupResponse[]>(`${this.url}/ranking_clusters_for_student/`, dormitoryId );
  }


}
