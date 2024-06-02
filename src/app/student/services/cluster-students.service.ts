import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StudentRequest} from "../../admin/models/studentRequest";
import {Observable} from "rxjs";
import {StudentResponse} from "../../admin/models/studentResponse";
import {ClusterOceanRequest} from "../models/ClusterOceanRequest";
import {ClusterOceanResponse} from "../models/ClusterOceanResponse";
import {PredictionClusterResponse} from "../models/PredictionClusterResponse";
import {GetStudentResponse} from "../models/GetStudentResponse";
import {GetMembershipValues} from "../models/GetMembershipValues";
import {GetStudentMembershipValues} from "../models/GetStudentMembershipValues";
import {LessInfoStudent} from "../models/lessInfoStudent/LessInfoStudent";
import {AddRoomResponse} from "../../admin/models/AddRoomResponse";

@Injectable({
  providedIn: 'root'
})
export class ClusterStudentsService {

  url: string = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {

  }
  sendClusters(studentId: number ,clusterOcean :ClusterOceanRequest): Observable<ClusterOceanResponse> {
    return this.http.put<ClusterOceanResponse>(`${this.url}/ocean/` + studentId,  clusterOcean );
  }
  predictCluster(studentId: number ,clusterOcean :ClusterOceanResponse): Observable<PredictionClusterResponse> {
   return this.http.put<PredictionClusterResponse>(`${this.url}/personality-cluster-prediction/` + studentId,  clusterOcean );
  }
   getStudentsSameClusterAndDormitory(studentId:number):Observable<GetStudentResponse[]>{
    return this.http.get<GetStudentResponse[]>(`${this.url}/cluster/` + studentId );
  }
  getMembershipValues(studentId:number):Observable<GetMembershipValues>{
    return this.http.get<GetMembershipValues>(`${this.url}/membership_values/` + studentId );
  }
  getRoommateMembershipValues(studentId:number):Observable<GetStudentMembershipValues[]>{
    return this.http.get<GetStudentMembershipValues[]>(`${this.url}/roommates/membership_values/` + studentId );
  }
  getRoommateIds(studentId:number):Observable<number[]>{
    return this.http.get<number[]>(`${this.url}/roommatesIds/` + studentId );
  }
  getRoommates(studentId:number):Observable<LessInfoStudent[]>{
    return this.http.get<LessInfoStudent[]>(`${this.url}/roommates/` + studentId );
  }
  getRoom(studentId:number):Observable<AddRoomResponse>{
    return this.http.get<AddRoomResponse>(`${this.url}/room/` + studentId );
  }



}
