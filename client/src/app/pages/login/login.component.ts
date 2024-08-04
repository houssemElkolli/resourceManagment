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

  constructor(private fb: FormBuilder, private apiService: LoginService) {
    this.generalInfoForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.apiService.login(this.generalInfoForm.value).subscribe((data) => {
        console.log(data);

        this.data = data;
      });
    }
  }
}
