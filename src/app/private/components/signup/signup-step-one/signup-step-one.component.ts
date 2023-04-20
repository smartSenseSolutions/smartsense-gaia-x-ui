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
import { FormBaseComponent } from 'src/app/shared/components';
import { ValidationConstant } from 'src/app/shared/constants';
import RegexConstant from 'src/app/shared/constants/regex.constants';

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
  // For Toggle purpose of show/hide
  passStatus: boolean = false;
  confirmPassStatus: boolean = false;

  //Boolean Vairble for password validation
  isContainUpperCaseLowerCase: boolean = false;
  isLengthSix: boolean = false;
  isContainSpecialCharacter: boolean = false;
  isContainNumber: boolean = false;

  //boolean Variable to Check Password and Confirm Password are same
  arePassWordSame: boolean = false;

  //SignupForm
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(protected override fb: FormBuilder, private router: Router) {
    super(fb);
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.email : 'mukund@gmail.com',
        [Validators.required]
      ),
      password: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.password : 'Smart@123',
        [
          Validators.required,
          Validators.pattern(RegexConstant.UPPERCASE_LOWERCASE),
          Validators.pattern(RegexConstant.MIN_LENGTH_SIX),
          Validators.pattern(RegexConstant.SPECIAL_CHARACTER),
          Validators.pattern(RegexConstant.CONTAIN_NUMBER),
        ]
      ),
      confirmPassword: new FormControl(
        this.stepOneFormData ? this.stepOneFormData.password : 'Smart@123',
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
    this.router.navigate([`RouteConstants.Login`]);
  };

  // Helper methods
  get formControls() {
    return this.signupForm.controls;
  }

  passwordChange() {
    let controlValue = this.signupForm.controls['password'].value;
    controlValue = controlValue === null ? '' : controlValue;
    this.isContainUpperCaseLowerCase =
      RegexConstant.UPPERCASE_LOWERCASE.test(controlValue);
    this.isContainSpecialCharacter =
      RegexConstant.SPECIAL_CHARACTER.test(controlValue);
    this.isContainNumber = RegexConstant.CONTAIN_NUMBER.test(controlValue);
    this.isLengthSix = RegexConstant.MIN_LENGTH_SIX.test(controlValue);
  }
}
