import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isLogged){
    return true
  }else{
    return router.parseUrl('/login')
  }

};
