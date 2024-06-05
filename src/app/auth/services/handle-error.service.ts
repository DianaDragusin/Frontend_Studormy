
import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CustomErrorResponse} from "../models/customErrorResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor( private toaster: ToastrService) { }
  public handleError(err: HttpErrorResponse) {
    if (err) this.toaster.error(err.error.errorMessage);
  }
  public handleErrorMessage(err: Error) {
    if (err) this.toaster.error(err.message);
  }

  public handleSuccess(suc: string) {
    if (suc) this.toaster.success(suc);
  }

  public handleInformative(info: string) {
    if (info) this.toaster.info(info);
  }

}
