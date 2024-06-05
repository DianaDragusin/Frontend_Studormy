import { Component } from '@angular/core';
import {AddRoomResponse} from "../../../admin/models/AddRoomResponse";
import {AuthService} from "../../../auth/services/auth.service";
import {AdminService} from "../../../admin/services/admin.service";
import {RoomService} from "../../../admin/services/room/room.service";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-see-rooms-available',
  templateUrl: './see-rooms-available.component.html',
  styleUrls: ['./see-rooms-available.component.css']
})
export class SeeRoomsAvailableComponent {
  maxPeople: number = 1;
  selectedRoomCount: number = 1;
  rooms: AddRoomResponse[] = [];
  roomNumber = 1;
  dormitoryId: number  = -1;
  addRoomButtonPressed: boolean  = false;
  studentId: number = -1;
  summary :Map<number, number>  = new Map;
  constructor(
    private authService : AuthService,
    private  studentService : StudentService,
    private  roomService: RoomService,
    private handleErrorService : HandleErrorService
  ) {}
  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    this.initDormitoryData();
  }

  initDormitoryData() {
    this.studentService.getStudent(this.studentId).subscribe({
      next: (studentResponse) => {
        this.dormitoryId = studentResponse.dormitory.dormitoryId;
        this.getAllRooms();
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }

  getAllRooms(){
    this.roomService.getAllVacantRooms(this.dormitoryId).subscribe({
      next: (getAllRoomsResponse) => {
        this.rooms = getAllRoomsResponse;
        this.summarizeRooms(getAllRoomsResponse);
      },
      error: (err) => {
        this.handleErrorService.handleInformative("There is no available room left!");
      }
    });
  }
  summarizeRooms(rooms: AddRoomResponse[]){
    const summary = new Map<number, number>();

    rooms.forEach(room => {
      const count = summary.get(room.maxPeopleNumber) || 0;
      summary.set(room.maxPeopleNumber, count + 1);
    });
  this.summary = summary;
  }
}
