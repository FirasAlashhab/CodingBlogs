import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: string = 'Normal User "Reader-Role"';
  admin: string = 'Admin User "Writer/Reader-Roles"';
  email1: string = 'Email: admin@codepulse.com';
  password1: string = 'Password: Admin@123';
  email: string = 'Email: firas.s.main1@gmail.com';
  password: string = 'Password: Firas@123';
  model: LoginRequest;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onSubmit() {
    this.authService.login(this.model).subscribe({
      next: (res) => {
        // set auth Cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${res.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this.router.navigate(['/']);

        this.authService.setUser({
          email: res.email,
          roles: res.roles,
        });
      },
    });
  }
}
