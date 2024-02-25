import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {HandleErrorService} from "./handle-error.service";
import {AuthService} from "./auth.service";
import {CustomErrorResponse} from "../models/customErrorResponse";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private toastrService: HandleErrorService,
    private authService: AuthService,

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastrService.handleError(error.error as string);
        return throwError('');
      })
    );
  }

}
