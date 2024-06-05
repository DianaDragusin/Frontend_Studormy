import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRole} from "../enums/userRole";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HandleErrorService} from "../services/handle-error.service";
import {LoginModel} from "../models/loginModel";
import {LoginResponse} from "../models/loginResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {BaseComponent} from "../basic/base.component";
import {EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES} from '../login/login.config';
import {LoginRequest} from "../models/loginRequest";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends BaseComponent implements OnInit  {
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

  onSubmit() {
    if (this.loginForm.valid) {
      const user: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: CryptoJS.SHA256(this.loginForm.get('password')?.value).toString(),
      };
  console.log(user)
      this.authService.signUp(user).subscribe(
        (adminId) => {
          const admin: LoginResponse = {
            id: adminId,
          };
          console.log(adminId);
          this.router.navigate(['addlist'], { queryParams: admin });
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
