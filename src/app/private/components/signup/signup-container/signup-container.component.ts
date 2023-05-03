import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  SignStepOneModel,
  SignStepTwoModel,
  SignupRequestModel,
} from 'src/app/public/models';
import { SignUpService } from 'src/app/public/services';
import { VerifyDialogComponent } from '../../verify-dialog/verify-dialog.component';
import { SignupStepOneComponent } from '../signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from '../signup-step-two/signup-step-two.component';
import { SignupStep } from './signup-container.constants';

@Component({
  selector: 'app-signup-container',
  standalone: true,
  imports: [
    CommonModule,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    MatDialogModule,
  ],
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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private signupService: SignUpService
  ) {}

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
    this.signupService.signup(signupRequest).subscribe((response) => {
      const dialogRef = this.dialog.open(VerifyDialogComponent, {
        width: '550px',
        data: {
          signupResponse: response,
        },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((success) => {
        location.reload();
      });
    });
  };

  onBackClick = (stepTwoData: SignStepTwoModel) => {
    this.stepTwoData = stepTwoData;
    this.activeStep = SignupStep.ONE;
  };
}
