import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import{MatSliderModule} from "@angular/material/slider";
import {MatDialogModule} from "@angular/material/dialog";
import { MatSidenavModule} from "@angular/material/sidenav";


const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatSidenavModule


];
@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})
export class AngularMaterialModule { }
