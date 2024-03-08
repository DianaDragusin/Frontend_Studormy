import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstudentlistComponent } from './components/addstudentlist/addstudentlist.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { UploadfileComponent } from './components/uploadfile/uploadfile.component';
import {AngularMaterialModule} from "../shared/angular-material.module";




@NgModule({
  declarations: [
    AddstudentlistComponent,
    UploadfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,

  ]
})
export class AdminModule { }
