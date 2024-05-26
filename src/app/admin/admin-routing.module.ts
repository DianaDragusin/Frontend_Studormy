import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddstudentlistComponent} from "./components/addstudentlist/addstudentlist.component";
import {GroupsComponent} from "../student/components/groups/groups.component";
import {AddRoomsComponent} from "./components/add-rooms/add-rooms.component";
import {
  RoomAllocationSettingsComponent
} from "./components/room-allocation-settings/room-allocation-settings.component";
import {RoomAllocationComponent} from "./components/room-allocation/room-allocation.component";

const routes: Routes = [
  {
    path: 'addlist',
    component: AddstudentlistComponent,
  },
  {
    path: 'add-rooms',
    component: AddRoomsComponent,
  },
  {
    path: 'room-allocation-settings',
    component: RoomAllocationSettingsComponent,
  },
  {
    path: 'room-allocation',
    component: RoomAllocationComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
