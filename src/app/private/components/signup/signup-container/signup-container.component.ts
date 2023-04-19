import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  SignStepOneModel,
  SignStepTwoModel,
  SignupRequestModel,
} from 'src/app/public/models';
import { RouteConstants } from 'src/app/shared/constants';
import { VerifyDialogComponent } from '../../verify-dialog/verify-dialog.component';
import { SignupStepOneComponent } from '../signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from '../signup-step-two/signup-step-two.component';
import { SignupStep } from './signup-container.constants';

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

  constructor(private router: Router, private dialog: MatDialog) {}

  onStepOneComplete = (stepOneData: SignStepOneModel) => {
    this.activeStep = SignupStep.TWO;
    this.stepOneData = stepOneData;
  };

  onStepTwoComplete = (stepTwoData: SignStepTwoModel) => {
    this.stepTwoData = stepTwoData;
    const signupRequest: SignupRequestModel = {
      ...this.stepOneData!,
      ...this.stepTwoData,
      headquarterAddress: this.stepTwoData.addressCode,
      legalAddress: this.stepTwoData.legalAddressCode,
    };
    const dialogRef = this.dialog.open(VerifyDialogComponent, {
      width: '550px',
      data: {
        signupRequest,
      },
    });
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.router.navigate([`${RouteConstants.Login}`]);
      }
    });
  };

  onBackClick = () => {
    this.activeStep = SignupStep.ONE;
  };
}
