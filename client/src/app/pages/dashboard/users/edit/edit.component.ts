import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EditService } from './edit.service';

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
  roles = [{ id: NaN, name: '' }];

  constructor(
    private fb: FormBuilder,
    private editService: EditService,
    private activatedRouter: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.generalInfoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      roleId: ['', Validators.required],
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

    this.editService.getRoles().subscribe((res) => {
      console.log(res);
      this.roles = res.data;
    });
  }

  onSubmit() {
    if (this.generalInfoForm.valid) {
      this.editService
        .update(
          {
            ...this.generalInfoForm.value,
            roleId: this.generalInfoForm.value.roleId,
          },
          this.id
        )
        .subscribe(
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
