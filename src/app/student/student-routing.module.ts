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
import {authGuard} from "../auth/guards/auth.guard";
import {ClustersComponent} from "./components/clusters/clusters.component";
import {BigFiveComponent} from "./components/big-five/big-five.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student-groups',
    component: GroupsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'see-rooms-available',
    component: SeeRoomsAvailableComponent,
    canActivate: [authGuard],
  },
  {
    path: 'apply-for-rooms',
    component: ApplyForRoomsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'clusters',
    component: ClustersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'big-five',
    component: BigFiveComponent,
    canActivate: [authGuard],
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [authGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
