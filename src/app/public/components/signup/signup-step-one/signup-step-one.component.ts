import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants/route.constants';

@Component({
  selector: 'app-signup-step-one',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss'],
})
export class SignupStepOneComponent {

  constructor(private router: Router) {}

  onProceedClick = () => {
    this.router.navigate([`${RouteConstants.SignUp}/${RouteConstants.Step2}`]);
  };
}
