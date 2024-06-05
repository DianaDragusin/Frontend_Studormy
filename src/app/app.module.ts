import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {StudentModule} from "./student/student.module";
import {AdminModule} from "./admin/admin.module";
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {LandingpageModule} from "./landingpage/landingpage.module";
import {authGuard} from "./auth/guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    LandingpageModule,
    StudentModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
