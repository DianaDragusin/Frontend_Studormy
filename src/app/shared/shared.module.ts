import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedRoutingModule} from "./shared-routing.module";
import {AngularMaterialModule} from "./angular-material.module";
import {FormErrorHandlingComponent} from "./components/form-error-handling/form-error-handling.component";
import {FirstFieldPipe} from "./pipes/first-field.pipe";
import {FormErrorEnum} from "./enums/form-error.enum";



@NgModule({
  declarations: [
    FormErrorHandlingComponent,
    FirstFieldPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AngularMaterialModule,

  ],
  exports: [
    FormErrorHandlingComponent
  ]
})
export class SharedModule { }
