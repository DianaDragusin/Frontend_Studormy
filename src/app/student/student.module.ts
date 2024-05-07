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



@NgModule({
  declarations: [
    ProfileComponent,
    QuestionsComponent,
    QuestionComponent,
    PersonCardComponent,
    EditProfileComponent,
    GroupsComponent,
    GroupMembersComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class StudentModule { }
