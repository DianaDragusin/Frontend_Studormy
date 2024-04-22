import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {StudentRoutingModule} from "./student-routing.module";
import { QuestionsComponent } from './components/questions/questions.component';
import {AngularMaterialModule} from "../shared/angular-material.module";
import { QuestionComponent } from './components/question/question.component';



@NgModule({
  declarations: [
    ProfileComponent,
    QuestionsComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule
  ]
})
export class StudentModule { }
