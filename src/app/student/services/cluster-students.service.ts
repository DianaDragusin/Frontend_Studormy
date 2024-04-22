import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StudentRequest} from "../../admin/models/studentRequest";
import {Observable} from "rxjs";
import {StudentResponse} from "../../admin/models/studentResponse";
import {ClusterOceanRequest} from "../models/ClusterOceanRequest";
import {ClusterOceanResponse} from "../models/ClusterOceanResponse";
import {PredictionClusterResponse} from "../models/PredictionClusterResponse";
import {GetStudentResponse} from "../models/GetStudentResponse";

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

  getStudent(studentId: number): Observable<GetStudentResponse>{
    return this.http.get<GetStudentResponse>(`${this.url}/` + studentId );
  }

}
