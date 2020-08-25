import { Injectable, Inject } from '@angular/core';
import { ToastService } from './toast.service';
import { UtilService } from './util.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toast: ToastService,
    private util: UtilService,
    private router: Router,
    @Inject('API_URL') private apiUrl) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: this.apiUrl + req.url + '?timestamp=' + new Date().getTime(),
      headers: req.headers.set('access_token', this.util.parameterTransfer(localStorage.getItem('access_token'), ''))
    });
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) { }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/security/login']);
            break;
          default:
            this.toast.show('系统无响应,请联系开发人员');
            break;
        }
        return throwError(error);
      }));
  }

}
