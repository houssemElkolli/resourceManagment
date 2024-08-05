import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  data: any;
  generalInfoForm: FormGroup;
  private tokenKey = 'authToken';
  private userEmail = 'email';
  error = { status: false, message: '' };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.generalInfoForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.loginService.login(this.generalInfoForm.value).subscribe(
        (res) => {
          sessionStorage.setItem(this.tokenKey, res.token);
          sessionStorage.setItem(this.userEmail, res.user.email);
          this.data = res.data;

          console.log(jwtDecode(res.token));

          if (res.user.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else this.router.navigate(['/send-email']);
        },
        (error) => {
          console.log(error);

          this.error = { status: true, message: 'invalid credentials' };
          setInterval(() => {
            this.error = { status: false, message: '' };
          }, 8000);
        }
      );
    }
  }
}
