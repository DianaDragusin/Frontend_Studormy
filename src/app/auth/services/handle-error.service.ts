
import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor( private toaster: ToastrService) { }
  public handleError(err: string) {
    if (err) this.toaster.error(err);
  }

  public handleSuccess(suc: string) {
    if (suc) this.toaster.success(suc);
  }

  public handleInformative(info: string) {
    if (info) this.toaster.info(info);
  }

}
