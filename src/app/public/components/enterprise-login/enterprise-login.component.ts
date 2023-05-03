import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants';
import { UserType } from 'src/app/shared/enums';
import { SharedService } from 'src/app/shared/services';
import { LoginService } from '../../services';

@Component({
  selector: 'app-enterprise-login',
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
  templateUrl: './enterprise-login.component.html',
  styleUrls: ['./enterprise-login.component.scss'],
})
export class EnterpriseLoginComponent implements OnInit {
  // Constant variables
  readonly UserType = UserType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  onLoginFormSubmit = (loginForm: FormGroup) => {};

  onSignUpClick = () => {
    this.router.navigate([RouteConstants.SignUp]);
  };
}
