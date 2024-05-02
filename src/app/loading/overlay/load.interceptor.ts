import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoadService } from './load.service';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';

export class loadInterceptor implements HttpInterceptor{
  private loadService = inject(LoadService)
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.headers.get('X-LOADING') === 'false'){
      return next.handle(request)
    }
    this.loadService.showLoader()
    return next
      .handle(request)
      .pipe(finalize(()=> this.loadService.hideLoader()))
  }
};
