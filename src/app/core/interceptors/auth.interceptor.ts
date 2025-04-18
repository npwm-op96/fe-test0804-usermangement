import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the custom header
    const clonedRequest = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin':"*",
        'Content-Type':"application/json",
        'x-test-token': 'xxxxxxxx', 
      },
    });

    // Pass the cloned request with the custom header
    return next.handle(clonedRequest);
  }
}
