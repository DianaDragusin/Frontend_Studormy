import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AuthService } from "../../../auth/services/auth.service";
import { AdminService } from "../../../admin/services/admin.service";
import { RoomService } from "../../../admin/services/room/room.service";
import { HandleErrorService } from "../../../auth/services/handle-error.service";
import { StudentService } from "../../services/student.service";
import { AddRoomResponse } from "../../../admin/models/AddRoomResponse";
import { SettingsService } from "../../../admin/services/settings/settings.service";
import { GetSettingsResponse } from "../../../admin/models/GetSettingsResponse";
import {MatDialog} from "@angular/material/dialog";
import {SelectGroupComponent} from "../select-group/select-group.component";
import {GroupService} from "../../services/group.service";
import {GroupResponse} from "../../models/group/GroupResponse";
import {StudentGroupResponse} from "../../models/group/StudentGroupResponse";
import {LessInfoGroup} from "../../models/lessInfoGroup/LessInfoGroup";

@Component({
  selector: 'app-apply-for-rooms',
  templateUrl: './apply-for-rooms.component.html',
  styleUrls: ['./apply-for-rooms.component.css']
})
export class ApplyForRoomsComponent implements AfterViewInit, OnInit {
  adminId: number = -1;
  displayedColumns: string[] = ['number', 'capacity'];  // Start without 'apply'
  dataSource = new MatTableDataSource<AddRoomResponse>([]);
  settingResponse: GetSettingsResponse | undefined;
  groups : LessInfoGroup[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private studentService: StudentService,
    private roomService: RoomService,
    private handleErrorService: HandleErrorService,
    private settingsService: SettingsService,
    private groupService : GroupService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initDormitoryData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkSettings(adminId: number) {
    this.settingsService.getSettings(adminId).subscribe({
      next: (getSettingsResponse) => {
        this.settingResponse = getSettingsResponse;
        if (getSettingsResponse.roomAllocationStarted && !getSettingsResponse.roomAllocationStopped   && this.adminId == -1) {
          this.displayedColumns = ['number', 'capacity', 'apply'];
        } else {
          this.displayedColumns = ['number', 'capacity'];
        }
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  initDormitoryData() {
    if (this.authService.getUserRole() === 'admin') {
      this.adminService.getAdmin(this.authService.getUserId()).subscribe({
        next: (adminResponse) => {
          this.adminId = adminResponse.id
          this.initRoomData(adminResponse.dormitory.dormitoryId);
          this.checkSettings(adminResponse.id);
        },
        error: (err) => this.handleErrorService.handleError(err)
      });
    } else if (this.authService.getUserRole() === 'student') {
      this.studentService.getStudent(this.authService.getUserId()).subscribe({
        next: (studResponse) => {
          this.initRoomData(studResponse.dormitory.dormitoryId);
          this.getAdminByDormitory(studResponse.dormitory.dormitoryId);
          this.initGroups(studResponse.id);
        },
        error: (err) => this.handleErrorService.handleError(err)
      });
    }
  }

  getAdminByDormitory(dormitoryId: number) {
    this.adminService.getAdminByDormitory(dormitoryId).subscribe({
      next: (adminResponse) => {
        this.checkSettings(adminResponse.id);
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  initRoomData(dormitoryId: number) {
    this.roomService.getAllRooms(dormitoryId).subscribe({
      next: (rooms) => {
        this.dataSource.data = rooms;
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  initGroups(studentId: number){
    this.groupService.getStudentGroups(studentId).subscribe({
      next: (getGroupsResponse) => {
        this.groups = getGroupsResponse.groups;
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }
  applyForRoom(row: any) {
    const dialogRef = this.dialog.open(SelectGroupComponent, {
      width: '50%',
      data: { groups: this.groups }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }
}
