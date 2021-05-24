import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { SwalService } from '../services/swal/swal.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private _swal: SwalService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized response returned from api
        this._swal.customError("Unathorized");
        this.authenticationService.logout();
      } else if ([403].indexOf(err.status) !== -1) {
        // auto logout if 403 Forbidden response returned from api
        this._swal.customError("Access Forbidden");
        this.authenticationService.logout();
        //location.reload(true);
      } else {
        this._swal.error();
      }

      const error = err.error.message || err.statusText;

      return throwError(error);
    }))
  }
}