import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "../landingpage/homepage/homepage.component";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "./components/profile/profile.component";
import {GroupsComponent} from "./components/groups/groups.component";
import {SeeRoomsAvailableComponent} from "./components/see-rooms-available/see-rooms-available.component";
import {ApplyForRoomsComponent} from "./components/apply-for-rooms/apply-for-rooms.component";
import {ChartComponent} from "./components/chart/chart.component";
import {ChartsComponent} from "./components/charts/charts.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'student-groups',
    component: GroupsComponent,
  },
  {
    path: 'see-rooms-available',
    component: SeeRoomsAvailableComponent,
  },
  {
    path: 'apply-for-rooms',
    component: ApplyForRoomsComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
