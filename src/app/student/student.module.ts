import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {StudentRoutingModule} from "./student-routing.module";
import { QuestionsComponent } from './components/questions/questions.component';
import {AngularMaterialModule} from "../shared/angular-material.module";
import { QuestionComponent } from './components/question/question.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import {SharedModule} from "../shared/shared.module";
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GroupsComponent } from './components/groups/groups.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { GroupMembersComponent } from './components/group-members/group-members.component';
import { SeeRoomsAvailableComponent } from './components/see-rooms-available/see-rooms-available.component';
import { ApplyForRoomsComponent } from './components/apply-for-rooms/apply-for-rooms.component';
import { SelectGroupComponent } from './components/select-group/select-group.component';
import { MyRoomComponent } from './components/my-room/my-room.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsComponent } from './components/charts/charts.component';



@NgModule({
  declarations: [
    ProfileComponent,
    QuestionsComponent,
    QuestionComponent,
    PersonCardComponent,
    EditProfileComponent,
    GroupsComponent,
    GroupMembersComponent,
    SeeRoomsAvailableComponent,
    ApplyForRoomsComponent,
    SelectGroupComponent,
    MyRoomComponent,
    ChartComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class StudentModule { }
