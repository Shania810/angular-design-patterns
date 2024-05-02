import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginForm } from './interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)
  //private url = 'http://localhost:3000/auth/login'
  private url = 'auth/login'
  //private token?: Token
  #token? : Token

  login(loginForm : Partial<LoginForm>): Observable<Token>{
    return this.httpClient
      .post<Token>(this.url, loginForm)
      .pipe(tap((token)=>this.#token = token))
  }

  get isLogged(){
    return this.#token ? true : false
  }

  logout(){
    this.#token = undefined
  }

  get token(){
    return this.#token?.access_token
  }

}
