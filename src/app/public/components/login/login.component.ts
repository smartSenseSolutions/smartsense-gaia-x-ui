import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/components';
import { RouteConstants } from 'src/app/shared/constants';
import { ValidationMessageConstant } from '../../constants/message.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormBaseComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  loginDetails!: FormGroup;
  readonly validationMessage =  ValidationMessageConstant;
  constructor(private router: Router, fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.initializers();
  }

  initializers = () => {
    this.loginDetails = this.fb.group({
      userName: ['', [Validators.required]],
      passWord: ['', [Validators.required]],
    });
  };

  onSignUpClick = () => {
    this.router.navigate([`${RouteConstants.SignUp}/${RouteConstants.Step1}`]);
  };

  onSubmitLoginForm = (loginDetails: FormGroup) => {
    if (this.onSubmit(loginDetails)) {
      this.router.navigateByUrl(RouteConstants.Home);
    }
  };



  get formControls() {
    return  this.loginDetails.controls;
  }
}
