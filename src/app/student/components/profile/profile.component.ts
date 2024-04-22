import { Component } from '@angular/core';
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  loginResponse: LoginResponse = {} as LoginResponse ;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loginResponse = params as LoginResponse;
    });
  }
}
