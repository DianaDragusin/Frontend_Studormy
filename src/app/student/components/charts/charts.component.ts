import {Component, Input} from '@angular/core';
import {ClusterStudentsService} from "../../services/cluster-students.service";
import {ActivatedRoute} from "@angular/router";
import {GetStudentMembershipValues} from "../../models/GetStudentMembershipValues";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {AddRoomResponse} from "../../../admin/models/AddRoomResponse";
import {LessInfoStudent} from "../../models/lessInfoStudent/LessInfoStudent";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @Input() studentId: number = -1;
  roommatesIds : number[] = [];
  roommates : LessInfoStudent[] = [];
  room : AddRoomResponse | undefined;
  constructor(
    private clusterStudentService: ClusterStudentsService,
    private route: ActivatedRoute,
    private handleErrorService: HandleErrorService,
  ) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = params['idStudent'];
    });
    this.getRoommatesMembershipData();
    this.getRoom();
    this.getRoommates();
  }
  private getRoommatesMembershipData(): void {
    this.clusterStudentService.getRoommateIds(this.studentId).subscribe({
      next: (ids) => {
        this.roommatesIds = ids;
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }
  private getRoommates(): void {
    this.clusterStudentService.getRoommates(this.studentId).subscribe({
      next: (roommates) => {
        this.roommates = roommates;
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }
  private getRoom(): void {
    this.clusterStudentService.getRoom(this.studentId).subscribe({
      next: (room) => {
        this.room = room;
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }
  generateChartId(studentId: number): string {
    return `pieChart-${studentId}`;
  }

}
