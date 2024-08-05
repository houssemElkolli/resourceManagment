import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-validation-message',
  templateUrl: './error-validation-message.component.html',
  styleUrls: ['./error-validation-message.component.css'],
})
export class ErrorValidationMessageComponent {
  @Input() displayedName!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;

  get errorMessage() {
    if (this.controlName && this.formGroup) {
      const control = this.formGroup.get(this.controlName);
      

      return control?.errors && (control.dirty || control.touched);
    }
    return false;
  }
}
