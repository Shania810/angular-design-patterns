import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

/*export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService)

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>>  {
    const  token = this.authService.token
    if(request.url.includes('auth')){
       return next.handle(request)
    }
    if(token){
      const reqAuth = request.clone({
        headers: request.headers.set(`Authorization`,`Bearer ${token}`)
      })
      return next.handle(reqAuth)
    }
    return next.handle(request)
  }
}
