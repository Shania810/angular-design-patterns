import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './login/auth.interceptor';
import { HostInterceptor } from './shared/host.interceptor';
import { loadInterceptor } from './loading/overlay/load.interceptor';
import { NotificationInterceptor } from './notification/notification.interceptor';
import { TelemetryInterceptor } from './telemetry/telemetry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: loadInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TelemetryInterceptor, multi: true}
  ],
};
