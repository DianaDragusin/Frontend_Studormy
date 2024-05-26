import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstudentlistComponent } from './components/addstudentlist/addstudentlist.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import {AngularMaterialModule} from "../shared/angular-material.module";
import { AddRoomsComponent } from './components/add-rooms/add-rooms.component';
import { RoomAllocationSettingsComponent } from './components/room-allocation-settings/room-allocation-settings.component';
import { RoomAllocationComponent } from './components/room-allocation/room-allocation.component';
import {ApplyForRoomsComponent} from "../student/components/apply-for-rooms/apply-for-rooms.component";




@NgModule({
  declarations: [
    AddstudentlistComponent,
    UploadfileComponent,
    AddRoomsComponent,
    RoomAllocationSettingsComponent,
    RoomAllocationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,

  ]
})
export class AdminModule { }
