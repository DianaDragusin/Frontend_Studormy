import {Component, OnInit} from '@angular/core';
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {map, Observable} from "rxjs";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {AdminService} from "../../services/admin.service";
import {GetAdminResponse} from "../../models/adminResponse";
import {GetStudentResponse} from "../../../student/models/GetStudentResponse";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {DormitoryService} from "../../services/dormitory/dormitory.service";
import {AddDormitoryResponse} from "../../models/AddDormitoryResponse";
import {LoginRequest} from "../../../auth/models/loginRequest";

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
  admin: GetAdminResponse | undefined;
  dorm : AddDormitoryResponse | undefined;
  finished: boolean = false;


  firstFormGroup = this._formBuilder.group({
    dormitory: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  loginResponse: LoginResponse = { id: -1 };

  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              breakpointObserver: BreakpointObserver,
              private adminService : AdminService,
              private dormitororyService: DormitoryService,
              private handleErrorService: HandleErrorService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.loginResponse = params as LoginResponse;
      this.getAdmin()
    });
  }

  getAdmin(){
    this.adminService.getAdmin(this.loginResponse.id).subscribe(
      (admin: GetAdminResponse) => {
        this.admin = admin;
      },
      error => {
        this.handleErrorService.handleError(error);
      }
    );
  }
  addDormitory(){
    if (this.firstFormGroup.valid) {
       const name = this.firstFormGroup.get('dormitory')?.value;
       if (name &&  this.admin?.id)
      this.dormitororyService.addDormitory(this.admin?.id,name).subscribe({
        next: (dorm) => {
          this.dorm = dorm;
          console.log(dorm);
          this.handleErrorService.handleSuccess("Successfully added the dormitory")
        },
        error: (err) => {
          this.handleErrorService.handleError(err);
        }
      });
      }

  }
  finishProcess(){
    this.finished = true;
  }
}
