import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppMessageConstants, RouteConstants } from '../constants';
import { SharedService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sharedService: SharedService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if internet is not available show toast & throw error.
    if (!navigator.onLine) {
      this.sharedService.setSnackBar(
        AppMessageConstants.NO_INTERNET_CONNECTION
      );
      return throwError({
        error: AppMessageConstants.NO_INTERNET_CONNECTION,
      });
    }
    // if request is public then send to network
    return next.handle(req).pipe(
      catchError((err) => {
        return this.processError(req, err);
      })
    );
  }

  private processError(
    req: HttpRequest<any>,
    err: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (err instanceof HttpErrorResponse) {
      if (!req.url.includes('public') && err.status === 401) {
        return this.logoutAndRedirect(err, AppMessageConstants.UNAUTHORIZED);
      } else {
        if (err.error) {
          if (err.error instanceof Blob) {
            const reader: FileReader = new FileReader();
            reader.onloadend = (e) => {
              const error = JSON.parse(reader.result as string);
              const message = error.message;
              if (message) {
                this.sharedService.setSnackBar(message);
              }
            };
            reader.readAsText(err.error);
          } else {
            const message = err.error.error ||  err.error.message;
            if (message) {
              this.sharedService.setSnackBar(message);
            }
          }
        }
        // if (err.status === 403) {
        //     this.router.navigate([`/${RouteConstants.UNAUTHORIZED}`]);
        // }
        return throwError(err);
      }
    }
    return throwError(err);
  }

  private logoutAndRedirect(
    err: HttpErrorResponse,
    message: string
  ): Observable<HttpEvent<any>> {
    this.sharedService.setSnackBar(message);
    this.sharedService.clearSession();
    return throwError(err);
  }
}
