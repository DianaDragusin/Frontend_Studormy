import {UserRole} from "../enums/userRole";

export interface LoginModel {
  email: string;
  password: string;
  role : UserRole
}
