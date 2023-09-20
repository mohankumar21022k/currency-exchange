import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        if (error.status === 429 || error.status === 401) {
                            errorMessage = `Please contact your support team with error code: ${error.status}`
                        } else {
                            errorMessage = 'Something Went Wrong, try again or contact your support team'
                        }
                    }

                    const err = new Error(errorMessage)
                    return throwError(() => err);
                })
            )
    }
}
