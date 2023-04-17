import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { FormBaseComponent } from 'src/app/shared/components';
import { RouteConstants, ValidationConstant } from 'src/app/shared/constants';
import { SharedService } from 'src/app/shared/services';
import { LoginRequestModel } from '../../models/login/login-request.model';
import { LoginService } from '../../services';

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
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseComponent {
  // Constant variables
  readonly validationMsg = new ValidationConstant();

  loginForm = new FormGroup({
    type: new FormControl(1),
    email: new FormControl('mukundsonaiya@gmail.com', [Validators.required]),
    password: new FormControl('Smart@123', [Validators.required]),
  });

  constructor(
    protected override fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {
    super(fb);
  }

  onLoginFormSubmit = (loginForm: FormGroup) => {
    if (this.onSubmit(loginForm)) {
      const loginRequest: LoginRequestModel = loginForm.value;
      this.loginService.login(loginRequest).subscribe((response) => {
        this.sharedService.setToken(response.payload.token);
        this.router.navigate([
          `${RouteConstants.SmartX}/${RouteConstants.ServiceCatalog}`,
        ]);
      });
    }
  };

  onSignUpClick = () => {
    this.router.navigate([`${RouteConstants.SignUp}}`]);
  };

  // Helper methods
  get formControls() {
    return this.loginForm.controls;
  }
}
