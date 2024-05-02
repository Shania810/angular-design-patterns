import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { finalize, Observable } from 'rxjs'

export class TelemetryInterceptor implements HttpInterceptor {
  intercept (request: HttpRequest<unknown>, next: HttpHandler) : Observable<HttpEvent<unknown>> {
    if (request.headers.get('X-TELEMETRY') !== 'true') {
      return next.handle(request)
    }
    const started = Date.now()
    return next.handle(request).pipe(
      finalize(() => {
        const elapsed = Date.now() - started
        const message = `${request.method} "${request.urlWithParams}" in ${elapsed}ms`
        console.log(message)
      })
    )
  }
}
