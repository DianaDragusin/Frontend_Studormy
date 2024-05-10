import {Component, OnInit} from '@angular/core';
import {AddRoomRequest} from "../../models/AddRoomRequest";
import {AuthService} from "../../../auth/services/auth.service";
import {AdminService} from "../../services/admin.service";
import {RoomService} from "../../services/room/room.service";
import {AddRoomResponse} from "../../models/AddRoomResponse";
import {HandleErrorService} from "../../../auth/services/handle-error.service";


@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {
  maxPeople: number = 1;
  selectedRoomCount: number = 1;
  rooms: AddRoomResponse[] = [];
  roomNumber = 1;
  dormitoryId: number  = -1;
  addRoomButtonPressed: boolean  = false;
  adminId: number = -1;
 constructor(
    private authService : AuthService,
    private  adminService : AdminService,
    private  roomService: RoomService,
    private handleErrorService : HandleErrorService
 ) {}
  ngOnInit(): void {
    this.adminId = this.authService.getUserId();
    this.initDormitoryData();
  }

  initDormitoryData() {
    this.adminService.getAdmin(this.adminId).subscribe({
      next: (adminResponse) => {
        this.dormitoryId = adminResponse.dormitory.dormitoryId;
        this.getMaxRoomNr();
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }

  getMaxRoomNr(){
    this.roomService.getMaxRoomNr(this.dormitoryId).subscribe({
      next: (maxNr) => {
        this.roomNumber = maxNr + 1;
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }

  addRooms() {
   this.addRoomButtonPressed = true;
    for (let i = 1; i <= this.selectedRoomCount; i++) {
      let request: AddRoomRequest = {roomNumber: this.roomNumber, maxPeopleNumber: this.maxPeople};
      this.roomService.addRoom(this.dormitoryId, request).subscribe({
        next: (roomResponse) => {
          this.rooms.push(roomResponse);
          this.handleErrorService.handleSuccess("Rooms successfully added");
        },
        error: (err) => {
          this.handleErrorService.handleError(err);
        }
      });
      this.roomNumber++;
    }
  }


}
