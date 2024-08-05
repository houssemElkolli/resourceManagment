import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  data: any;
  generalInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.generalInfoForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.loginService.login(this.generalInfoForm.value).subscribe((data) => {
        this.data = data;
      });
    }
  }
}
