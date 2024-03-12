import {Component, OnInit} from '@angular/core';
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {map, Observable} from "rxjs";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  selector: 'app-addstudentlist',
  templateUrl: './addstudentlist.component.html',
  styleUrls: ['./addstudentlist.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AddstudentlistComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    dormitory: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  loginResponse: LoginResponse = { id: -1 };

  constructor(private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loginResponse = params as LoginResponse;
    });
  }
}
