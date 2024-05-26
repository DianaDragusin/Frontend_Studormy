import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {AdminService} from "../../services/admin.service";
import {RoomService} from "../../services/room/room.service";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {SettingsService} from "../../services/settings/settings.service";
import {GetSettingsResponse} from "../../models/GetSettingsResponse";
import {
  AutomaticRoomAllocationProcessService
} from "../../services/automaticRoomAllocationProcess/automatic-room-allocation-process.service";

@Component({
  selector: 'app-room-allocation-settings',
  templateUrl: './room-allocation-settings.component.html',
  styleUrls: ['./room-allocation-settings.component.css']
})
export class RoomAllocationSettingsComponent implements OnInit{
  allocationProcessStatus: number = 0;
  adminId = -1;
  dormitoryId = -1;
  getSettingResponse:GetSettingsResponse | undefined;
  constructor(
    private authService : AuthService,
    private  adminService : AdminService,
    private  roomService: RoomService,
    private settingService : SettingsService,
    private handleErrorService : HandleErrorService,
    private automaticRoomAllocationProcessService: AutomaticRoomAllocationProcessService
  ) {}
  ngOnInit(): void {
    this.adminId = this.authService.getUserId();
    this.initDormitoryId();
    this.getSetting();
  }
 addSetting(allPS: number){
    if (allPS == 1 )
    {
      this.settingService.addSettingEntity(this.adminId,true).subscribe({
        next: (getSettingResponse) => {
          this.getSetting()
          this.handleErrorService.handleSuccess("Successfully started the room Allocation Process")
        },
        error: (err) => {
          this.handleErrorService.handleError(err);
        }
      });
    }
 }
  initDormitoryId() {
      this.adminService.getAdmin(this.adminId).subscribe({
        next: (adminResponse) => {
          this.dormitoryId = adminResponse.dormitory.dormitoryId;
        },
        error: (err) => this.handleErrorService.handleError(err)
      });
  }

  setAllocationProcessStatus(status: number) {

    this.allocationProcessStatus = status;
    if (this.allocationProcessStatus == 1 && this.getSettingResponse?.settingsId == null)
    {

      this.addSetting(1);
    }
    else if (this.allocationProcessStatus == 2 && this.getSettingResponse?.roomAllocationStopped == false)
    {
        this.putSetting();
    }

  }
  putSetting(){
    this.settingService.putSettings(this.adminId,true).subscribe({
      next: (getSettingResponse) => {
        this.getSettingResponse = getSettingResponse;
        this.showAllStudentsWithRoom();
          this.handleErrorService.handleSuccess("Successfully stopped the room allocation process");
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }
  showAllStudentsWithRoom(){
    this.automaticRoomAllocationProcessService.assignRemainingStudentsToVacantRooms(this.dormitoryId).subscribe({
      next: (groups) => {
        console.log(groups);
        this.handleErrorService.handleSuccess("Successfully allocated the remaining students to a room");
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });

  }
  getSetting(){
    this.settingService.getSettings(this.adminId).subscribe({
      next: (getSettingResponse) => {
        this.getSettingResponse = getSettingResponse;
        console.log(this.getSettingResponse)
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }

}
