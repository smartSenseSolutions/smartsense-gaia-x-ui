import { Component } from '@angular/core';
import { SignupStep } from './signup-container.constants';
import { SignupStepOneComponent } from '../signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from '../signup-step-two/signup-step-two.component';
import { CommonModule } from '@angular/common';
import {
  SignStepOneModel,
  SignStepTwoModel,
  SignupRequestModel,
} from 'src/app/public/models';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/public/services';
import { RouteConstants } from 'src/app/shared/constants';

@Component({
  selector: 'app-signup-container',
  standalone: true,
  imports: [CommonModule, SignupStepOneComponent, SignupStepTwoComponent],
  templateUrl: './signup-container.component.html',
  styleUrls: ['./signup-container.component.scss'],
})
export class SignupContainerComponent {

  // Constant variables
  readonly SignupStep = SignupStep;

  stepOneData: SignStepOneModel | undefined;
  stepTwoData: SignStepTwoModel | undefined;

  // Status variables
  activeStep: SignupStep = SignupStep.ONE;

  constructor(private router: Router, private signupService: SignUpService) {}

  onStepOneComplete = (stepOneData: SignStepOneModel) => {
    this.activeStep = SignupStep.TWO;
    this.stepOneData = stepOneData;
  };

  onStepTwoComplete = (stepTwoData: SignStepTwoModel) => {
    this.stepTwoData = stepTwoData;
    const signupRequest: SignupRequestModel = {
      ...this.stepOneData!,
      ...this.stepTwoData!,
    };
    console.log(signupRequest);
    // this.signupService.signup(signupRequest).subscribe((response) => {
    //   this.router.navigate([`${RouteConstants.Login}`]);
    // });
  };

  onBackClick = () => {
    this.activeStep = SignupStep.ONE;
  }
}
