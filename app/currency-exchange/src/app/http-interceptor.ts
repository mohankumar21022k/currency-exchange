import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { LoaderService } from './loader.service';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class LoaderHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('--LoaderHttpInterceptor')
    LoaderService.showLoader();

    return next.handle(req).pipe(
      map(res => {
        LoaderService.hideLoader();
        return res;
      }),
      catchError(error => {
        LoaderService.hideLoader();
        throw error;
      })
    )
  }
}
