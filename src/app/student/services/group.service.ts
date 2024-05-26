import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {GetStudentResponse} from "../models/GetStudentResponse";
import {UpdateStudentRequest} from "../models/UpdateStudentRequest";
import {GroupResponse} from "../models/group/GroupResponse";
import {AddStudentToGroupRequest} from "../models/group/AddStudentToGroupRequest";
import {StudentGroupResponse} from "../models/group/StudentGroupResponse";
import {LessInfoGroup} from "../models/lessInfoGroup/LessInfoGroup";

export interface Member {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  members: Member[];
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  url: string = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {

  }
  getGroupById(groupId: number): Observable<GroupResponse>{
    return this.http.get<GroupResponse>(`${this.url}/` + groupId);
  }
  getAssignedGroupByDormitoryId(dormitoryId: number): Observable<GroupResponse[]>{
    return this.http.get<GroupResponse[]>(`${this.url}/assignedToDormitory/` + dormitoryId);
  }
  getStudentGroups(studentId: number): Observable<StudentGroupResponse>{
    return this.http.get<StudentGroupResponse>(`${this.url}/ofStudent/` + studentId);
  }
  addGroup(id: number, name: string): Observable<GroupResponse>{
    return this.http.post<GroupResponse>(`${this.url}/` + id, name );
  }
  deleteGroup(id: number):  Observable<number>  {
   return  this.http.delete<number>(`${this.url}/` + id );
  }
  deleteStudentFromGroup(groupId: number,studentId: number):  Observable<number>{
    const newUrl = `${this.url}/${groupId}/students/${studentId}`;
    return this.http.put<number>(newUrl, null );
  }
  applyForRoomWithGroup(groupId: number,roomId: number):  Observable<GroupResponse>{
    const newUrl = `${this.url}/${groupId}/rooms/${roomId}`;
    return this.http.put<GroupResponse>(newUrl, null );
  }
  hasAppliedForARoom(groupId: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/hasRoomAssigned/` + groupId);
  }

  addStudentToGroup(addStudentToGroupRequest: AddStudentToGroupRequest): Observable<GroupResponse>{
    return this.http.put<GroupResponse>(`${this.url}/addStudentToGroup` , addStudentToGroupRequest);
  }

  leaveGroup(groupId: number, memberId: number): void {

  }

  createGroup(name: string): void {

  }

  addMember(groupId: number, member: Member): void {

  }
}
