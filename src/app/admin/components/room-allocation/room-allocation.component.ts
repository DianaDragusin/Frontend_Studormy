import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AddRoomResponse} from "../../models/AddRoomResponse";
import {GetSettingsResponse} from "../../models/GetSettingsResponse";
import {LessInfoGroup} from "../../../student/models/lessInfoGroup/LessInfoGroup";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../../auth/services/auth.service";
import {AdminService} from "../../services/admin.service";
import {StudentService} from "../../../student/services/student.service";
import {RoomService} from "../../services/room/room.service";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {SettingsService} from "../../services/settings/settings.service";
import {GroupService} from "../../../student/services/group.service";
import {MatDialog} from "@angular/material/dialog";
import {SelectGroupComponent} from "../../../student/components/select-group/select-group.component";
import {GroupResponse} from "../../../student/models/group/GroupResponse";
import {GetAllocationResponse} from "../../models/GetAllocationResponse";

@Component({
  selector: 'app-room-allocation',
  templateUrl: './room-allocation.component.html',
  styleUrls: ['./room-allocation.component.css']
})
export class RoomAllocationComponent implements AfterViewInit, OnInit{
  adminId: number = -1;
  maxCapacity: number = -1;
  displayedColumns: string[] = ['number', 'capacity'];
  dataSource = new MatTableDataSource<GetAllocationResponse>([]);
  settingResponse: GetSettingsResponse | undefined;
  groups: LessInfoGroup[] = [];
  hasAppliedForARoom: Boolean = false;
  assignedGroups: GroupResponse[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private roomService: RoomService,
    private handleErrorService: HandleErrorService,
    private settingsService: SettingsService,
    private groupService: GroupService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initDormitoryData();
    this.hasAppliedForARoom = false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  initDormitoryData() {
    if (this.authService.getUserRole() === 'admin') {
      this.adminService.getAdmin(this.authService.getUserId()).subscribe({
        next: (adminResponse) => {
          this.adminId = adminResponse.id
          this.initRoomData(adminResponse.dormitory.dormitoryId);
          this.getMaxCapacity(adminResponse.dormitory.dormitoryId);
        },
        error: (err) => this.handleErrorService.handleError(err)
      });
    }
  }

  getMaxCapacity(dormitoryId: number) {
    this.roomService.getMaxCapacity(dormitoryId).subscribe({
      next: (maxCapacity) => {
        this.maxCapacity = maxCapacity;
        this.generateRoommateColumns(maxCapacity);
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  getAssignedGroupsInDormitory(dormitoryId: number, rooms: AddRoomResponse[]) {
    this.groupService.getAssignedGroupByDormitoryId(dormitoryId).subscribe({
      next: (groups) => {
        this.assignedGroups = groups;
        this.setUpAssignationRoom(groups, rooms);
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  initRoomData(dormitoryId: number) {
    this.roomService.getAllRooms(dormitoryId).subscribe({
      next: (rooms) => {
        this.getAssignedGroupsInDormitory(dormitoryId, rooms);
      },
      error: (err) => this.handleErrorService.handleError(err)
    });
  }

  setUpAssignationRoom(groups: GroupResponse[], rooms: AddRoomResponse[]) {
    const mappedRooms: GetAllocationResponse[] = [];

    groups.forEach(group => {
      const room = rooms.find(r => r.roomId === group.roomId);
      if (room) {
        const students: { [key: string]: string } = {};
        group.students.forEach((student, index) => {
          students[`roommate${index + 1}`] = student.email;
        });

        mappedRooms.push({
          ...room,
          students: group.students,
          ...students
        });
      }
    });

    console.log(mappedRooms);
    this.dataSource.data = mappedRooms;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterGroupsByMaxPeopleNr(groups: LessInfoGroup[], targetMaxPeopleNr: number): LessInfoGroup[] {
    return groups.filter(group => group.memberNumber === targetMaxPeopleNr);
  }

  private generateRoommateColumns(maxCapacity: number) {
    for (let i = 1; i <= maxCapacity; i++) {
      this.displayedColumns.push(`roommate${i}`);
    }
  }

}
