import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddstudentlistComponent} from "./components/addstudentlist/addstudentlist.component";
import {GroupsComponent} from "../student/components/groups/groups.component";
import {AddRoomsComponent} from "./components/add-rooms/add-rooms.component";
import {
  RoomAllocationSettingsComponent
} from "./components/room-allocation-settings/room-allocation-settings.component";
import {RoomAllocationComponent} from "./components/room-allocation/room-allocation.component";
import {authGuard} from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: 'addlist',
    component: AddstudentlistComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-rooms',
    component: AddRoomsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'room-allocation-settings',
    component: RoomAllocationSettingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'room-allocation',
    component: RoomAllocationComponent,
    canActivate: [authGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
