import {Component, OnInit} from '@angular/core';
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-addstudentlist',
  templateUrl: './addstudentlist.component.html',
  styleUrls: ['./addstudentlist.component.css']
})
export class AddstudentlistComponent implements OnInit {
  loginResponse: LoginResponse = { id: -1 };

  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // Retrieve the query parameters from the route
    this.activatedRoute.queryParams.subscribe(params => {
      this.loginResponse = params as LoginResponse;
    });
  }
}
