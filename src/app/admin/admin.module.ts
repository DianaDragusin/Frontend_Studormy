import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstudentlistComponent } from './components/addstudentlist/addstudentlist.component';
import {AdminRoutingModule} from "./admin-routing.module";



@NgModule({
  declarations: [
    AddstudentlistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
