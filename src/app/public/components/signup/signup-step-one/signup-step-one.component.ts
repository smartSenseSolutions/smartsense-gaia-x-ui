import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SignStepOneModel } from 'src/app/public/models';
import { LoginRequestModel } from 'src/app/public/models/login/login-request.model';
import { FormBaseComponent } from 'src/app/shared/components';
import { RouteConstants, ValidationConstant } from 'src/app/shared/constants';

@Component({
  selector: 'app-signup-step-one',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss'],
})
export class SignupStepOneComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() stepOneFormData: SignStepOneModel | undefined;
  @Output() onStepOneComplete = new EventEmitter<SignStepOneModel>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  signupForm = new FormGroup({
    email: new FormControl('email', [Validators.required]),
    password: new FormControl('Smart', [Validators.required]),
    confirmPassword: new FormControl('Smart', [Validators.required]),
  });

  constructor(protected override fb: FormBuilder, private router: Router) {
    super(fb);
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.email : 'email',
        [Validators.required]
      ),
      password: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.password : 'Smart',
        [Validators.required]
      ),
      confirmPassword: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.password : 'Smart',
        [Validators.required]
      ),
    });
  }

  onSignupStepOneFormSubmit = (signupForm: FormGroup) => {
    if (this.onSubmit(signupForm)) {
      this.onStepOneComplete.emit(signupForm.value);
    }
  };

  onSignInClick = () => {
    this.router.navigate([`${RouteConstants.Login}`]);
  };

  // Helper methods
  get formControls() {
    return this.signupForm.controls;
  }
}
