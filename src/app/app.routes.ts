import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((file)=> file.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((file)=> file.LoginModule)
  },
  {
    path: 'error', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: '/error'
  }
];
