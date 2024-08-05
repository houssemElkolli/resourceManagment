import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorValidationMessageComponent } from './error-validation-message.component';

describe('ErrorValidationMessageComponent', () => {
  let component: ErrorValidationMessageComponent;
  let fixture: ComponentFixture<ErrorValidationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorValidationMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
