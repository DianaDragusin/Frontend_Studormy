import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../basic/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES} from './login.config';
import {UserRole} from "../enums/userRole";
import {LoginModel} from "../models/loginModel";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HandleErrorService} from "../services/handle-error.service";
import {CustomErrorResponse} from "../models/customErrorResponse";
import {LoginResponse} from "../models/loginResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;
  email!: string;
  password!: string;
  isLoginSuccessful: boolean = false;
  isLoginFailed: boolean = false;
  selectedRole!: UserRole;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private handleErrorService: HandleErrorService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  selectRole(role : string) {
    if ( role == 'student')
    {
      this.selectedRole = UserRole.Student;
    }
    else
    {
      this.selectedRole = UserRole.Admin;
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const user: LoginModel = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        role:  this.selectedRole,
      };

      this.authService.login(user).subscribe(
        (loginResponse: LoginResponse) => {
          if (this.selectedRole == UserRole.Student) {
            this.router.navigate(['profile'], { queryParams: loginResponse });
          } else if (this.selectedRole == UserRole.Admin) {
            this.router.navigate(['addlist'], { queryParams: loginResponse });
          }

          this.handleErrorService.handleSuccess("Successfully logged in");

        },
        (error: HttpErrorResponse) => {
          this.handleErrorService.handleError(error);
        }
      );
    }
  }

  protected readonly EMAIL_ERROR_MESSAGES = EMAIL_ERROR_MESSAGES;
  protected readonly PASSWORD_ERROR_MESSAGES = PASSWORD_ERROR_MESSAGES;

}
