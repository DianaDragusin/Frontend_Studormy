import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "../landingpage/homepage/homepage.component";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "./components/profile/profile.component";
import {GroupsComponent} from "./components/groups/groups.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'student-groups',
    component: GroupsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
