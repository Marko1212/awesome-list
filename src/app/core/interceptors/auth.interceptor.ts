import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addContentType(request); // On utilise notre nouvelle méthode 'addContentType'.
     
        return next.handle(request); // On supprime l'utilisation de 'console.log'.
      }
     
      private addContentType(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });    
      }

}