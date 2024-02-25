import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./homepage/homepage.component";
import {LandingpageRoutingModule} from "./landingpage-routing.module";
import {AngularMaterialModule} from "../shared/angular-material.module";


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    LandingpageRoutingModule,
    AngularMaterialModule
  ],
  exports: [
    HomepageComponent
  ]
})
export class LandingpageModule { }
