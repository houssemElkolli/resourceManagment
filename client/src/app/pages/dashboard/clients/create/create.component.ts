import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  generalInfoForm: FormGroup;
  success = { status: false, message: '' };
  error = { status: false, message: '' };

  constructor(private fb: FormBuilder, private createService: CreateService) {
    this.generalInfoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      date_of_birth: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.createService.create(this.generalInfoForm.value).subscribe(
        (res) => {
          this.success = { status: true, message: res.message };
          setInterval(() => {
            this.success = { status: false, message: '' };
          }, 2500);
          this.generalInfoForm.reset();
        },
        (error) => {
          console.log(error);

          this.error = { status: true, message: error.error.split(',')[0] };
          setInterval(() => {
            this.error = { status: false, message: '' };
          }, 8000);
        }
      );
    }
  }
}
