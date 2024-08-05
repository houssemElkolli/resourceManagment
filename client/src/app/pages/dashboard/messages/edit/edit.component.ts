import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditService } from './edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  data: any;
  generalInfoForm: FormGroup;
  success = { status: false, message: '' };
  error = { status: false, message: '' };

  constructor(
    private fb: FormBuilder,
    private editService: EditService,
    private activatedRouter: ActivatedRoute
  ) {
    this.generalInfoForm = this.fb.group({
      object: ['', Validators.required],
      description: ['', Validators.required],
      importance_status: ['', Validators.required],
    });
  }
  id = parseInt(this.activatedRouter.snapshot.paramMap.get('id') || '0');
  message = '';

  ngOnInit() {
    this.editService.edit(this.id).subscribe((res) => {
      console.log(res);
      this.message = res.message;
      this.generalInfoForm.patchValue(res.data);
    });
  }

  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.editService.update(this.generalInfoForm.value, this.id).subscribe(
        (res) => {
          this.success = { status: true, message: res.message };
          setInterval(() => {
            this.success = { status: false, message: '' };
          }, 2500);
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
