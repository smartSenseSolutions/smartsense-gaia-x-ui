import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/components';
import { RouteConstants, ValidationConstant } from 'src/app/shared/constants';
import { UserType } from 'src/app/shared/enums';
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
export class LoginComponent extends FormBaseComponent implements OnInit {
  // Constant variables
  readonly validationMsg = new ValidationConstant();
  readonly UserType = UserType;

  // Status variables
  canShowPassword: boolean = false;
  loginType: UserType | undefined;

  loginForm = new FormGroup({
    type: new FormControl(),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    protected override fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.loginType = this.route.snapshot.data['loginType'];
    this.loginForm = new FormGroup({
      type: new FormControl(this.loginType),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(16),
      ]),
    });
  }

  onLoginFormSubmit = (loginForm: FormGroup) => {
    if (this.onSubmit(loginForm)) {
      const loginRequest: LoginRequestModel = loginForm.value;
      this.loginService.login(loginRequest).subscribe((response) => {
        this.sharedService.setUser(response.payload.session);
        this.sharedService.setToken(response.payload.token);
        const user = this.sharedService.getUser();
        if (user.role == UserType.Admin) {
          this.router.navigate([RouteConstants.SignUp]);
        } else {
          this.router.navigate([
            `${RouteConstants.SmartX}/${RouteConstants.DashBoard}`,
          ]);
        }
      });
    }
  };

  onSignUpClick = () => {
    this.router.navigate([RouteConstants.SignUp]);
  };

  // Helper methods
  get formControls() {
    return this.loginForm.controls;
  }
}
