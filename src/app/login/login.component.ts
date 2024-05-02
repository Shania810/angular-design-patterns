import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  private formBuilder = inject(NonNullableFormBuilder)
  private loginService = inject(AuthService)
  private router = inject(Router)

  public loginForm = this.formBuilder.group({
    username: ['',Validators.required],
    password: ['', Validators.required]
  })

  login(){
    const loginValue = {...this.loginForm.value}
    this.loginService.login(loginValue).subscribe({
      next: (_) => {
        this.router.navigate(['/home'])
      },
      error: (e) => alert('User not Found')
    })
  }
}
